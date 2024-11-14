# 프로젝트 생성

## 명령

```
npm init -y
npm install next react react-dom @reduxjs/toolkit react-redux react-hook-form yup
npm install -D typescript @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer
npm install classnames react-icons @headlessui/react@latest
npx tsc --init
npx tailwindcss init -p
mkdir -p src/{pages,components,store,styles,types}
```

## 파일 수정

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "incremental": true,
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "resolveJsonModule": true,
    "allowJs": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "skipLibCheck": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### `package.json`

```
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
```

# pages -> app
주요 변경 사항:

pages/_app.tsx = app/layout.tsx + app/providers.tsx
pages/index.tsx = app/page.tsx + HomeForm 컴포넌트

- 'use client' 지시문 = 클라이언트 컴포넌트 명시
- App Router 인덱스 페이지는 반드시 page.tsx 이름 (index.tsx 아님)
- 
```
  app/
  ├── (shop)/                # URL에 영향을 주지 않는 그룹화
  │   ├── books/
  │   │   └── page.tsx      # /books
  │   └── authors/
  │       └── page.tsx      # /authors
  └── (marketing)/          
  └── about/
  └── page.tsx      # /about
```

## Next.js App Router의 특별 파일 이름들 (변경 불가):

layout.tsx
page.tsx
loading.tsx
error.tsx
not-found.tsx
route.tsx
template.tsx

## 번들 분석기
npm install --save-dev @next/bundle-analyzer

`next.config.js`

```js
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    })

const nextConfig = {
    reactStrictMode: true,
}

module.exports = withBundleAnalyzer(nextConfig)

//
//환경 변수 설정
//웹팩 설정 커스터마이징
//이미지 최적화 설정
//국제화(i18n) 설정
//리다이렉트/리라이트 설정
```