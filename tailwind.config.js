/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // app 디렉토리의 모든 파일
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // pages 디렉토리의 모든 파일 (있는 경우)
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // components 디렉토리의 모든 파일
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

