
//  UseLocalStorage Hook ...


export default function useLocalStorage(storage_name="memoriex-app") {

	function findOrCreate(){
		return JSON.parse(localStorage.getItem(storage_name)) || localStorage.setItem(storage_name,'[]')
	}

	const setStore = (item)=>{
		const currentItemInStore=findOrCreate()
		currentItemInStore.push(item)
		const itemToSet= JSON.stringify(currentItemInStore)
		localStorage.setItem(storage_name,itemToSet)
	}

	const deleteStore=()=>{
		localStorage.removeItem(storage_name)
	}

	const getStore=findOrCreate

	return [setStore,getStore,deleteStore]
}