import React from 'react'

export default function useAccounts() {
	const CRED_STORE = 'my-memoriex'
	

	// Local Storage Structure ..
	const allAccounts = {
		currentAccount : "" ,
		otherAccounts : [ ]
	}


	//  Get Auth Store Values
	function getStore () {
		// Working
		const item = JSON.parse(localStorage.getItem(CRED_STORE))
		return item || ""
	} 


	//  Set Auth Store Values
	function setStore (value) {
		// Working
		const pure_value = JSON.stringify(value)
		const toStore = localStorage.setItem(CRED_STORE,pure_value)
		console.log("Set Store : ",toStore)
		return toStore ? true : false
	}


	const addAccount = (value) => {
		console.log(value);
		//  If there is no current Account
		if (!getCurrentAccount().currentAccount){
			const toStore1 = {...getStore(), currentAccount :value}
			setStore(toStore1)
		}
		//  Check if user exists 
		const alreadyExists = getStore()['otherAccounts']?.some((users) => users.id == value.id )
		if (alreadyExists) return console.log("User Exists : ", value.id);

		//  Assemble full account structure
		const FullDetails = { ...getStore(), otherAccounts : [...getStore()['otherAccounts'],value] } 

		setStore(FullDetails)
		return true
	}


	function removeAccount (value) {
		// Working
		if (!value) return console.log("No Value (Empty)");

		if ( getStore()['currentAccount']?.id == value?.id ){
			const filtered_value1 = {...getStore(), currentAccount :""}
			setStore(filtered_value1)
		}
		const filtered_value2 = getStore()['otherAccounts']?.filter((user) => user.id != value.id)
		// construct new data from filtered value 
		const filtered_toUpdate = { currentAccount : getStore()['currentAcount'], otherAccounts :filtered_value2}
		setStore(filtered_toUpdate)
	}


	function logOutUser () {
		const logout_ = {...getStore(), currentAccount :""}
		setStore(logout_)
		console.log("LogOut : ",logout_)
	}


	const getCurrentAccount = () => {
		if (!getStore()) return setStore(allAccounts)
		return getStore()['currentAccount'] || false
	}


	const setCurrentAccount = (account) => {
		if (!account) return 
		const new_details = {...getStore(),currentAccount:account}
		setStore(new_details)
	}


	return [getCurrentAccount,addAccount,removeAccount,logOutUser,getStore,setCurrentAccount]
}