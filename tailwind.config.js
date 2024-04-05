/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { inter: "Inter" } ,
      colors: {
        primaryColor: '#652078',
        secondaryColor: '#E46722',
        bodyColor:"#F2F4F9",

      },
      backgroundColor: {
         "yellow-800": '#DB710E',
         "blue-800" : '#4B49AC',
         "checkbox-color":"#edecf7"
      },
    },
  } 
}