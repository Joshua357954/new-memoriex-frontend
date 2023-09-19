import React,{useEffect} from 'react'

export default function useTheme() {

	const storeName = 'memoriex-theme'
	const bodyCls = window.document.body.classList
	const localTheme = () => localStorage.getItem(storeName)
	const setThemeStore = (item) => localStorage.setItem(storeName,item)
	let isEnabled = false

	const toggleTheme = () => {

		isEnabled= localTheme()=='dark' ? true : false

		if (isEnabled) {
			bodyCls.remove('dark')
			setThemeStore('light')
		}
		else {
			bodyCls.add('dark')
			setThemeStore('dark')
		}
		return isEnabled	  
	}

	useEffect(() => {
		localTheme()=='dark' ? bodyCls.add('dark') : console.log('e now work',localTheme())
	},[])

	return [toggleTheme,localTheme()=='dark']
}