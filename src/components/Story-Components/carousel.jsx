import React,{useRef} from 'react'

export default function carousel(props) {
	const count = useRef(0)
	return (
		<div className="relative flex flex-col h-full items-center justify-start w-full dark:bg-gray-700 bg-gray-50 md:w-1/2 lg:w-2/5">
					
			<div className="absolute top-0 left-0 h-full w-5 text-center active:bg-transparent"></div>
			<div className="absolute top-0 right-0 h-full w-5 text-center active:bg-transparent"></div>

			{props.children}
			{/*	{console.log(children?.props?.length)}*/}
			
		</div>
	)
}