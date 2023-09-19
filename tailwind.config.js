/** @type {import('tailwindcss').Config} */
module.exports = {
	mode:'jit',
  darkMode:'class',
  content: [  
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme:{
    screens:{
     
    	'sm':'510px',
    	'md':'520px',
    	'lg':'804px',
    	'xl':'1025px',
      'xxl':'1300px'
    }
  },
  plugins:[
    require('tailwind-scrollbar')
  ],
  variants:{
    scrollbar:['rounded']
  }
}
