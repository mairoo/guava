npm init -y
npm install next react react-dom @reduxjs/toolkit react-redux react-hook-form yup
npm install -D typescript @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer
npx tsc --init
직접 수정

npx tailwindcss init -p
mkdir -p src/{pages,components,store,styles,types}

"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
},
