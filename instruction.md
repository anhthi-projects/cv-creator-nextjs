# 1. Install next, react and react-dom

```
  npm install next react react-dom
```

Update script in package.json

```
  "scripts": {
    "dev": "node server.ts",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.ts",
    "lint": "next lint"
  },
```

Create the `next.config.js` at root

# 2. Install Typescript

Create `tsconfig.json` file at root and install typescript and dependencies

```
  npm i typescript @types/react @types/node -D
```

# 3. Setup server and routing manually

Create the `server.js`, `routes.js` and `pages` at src directory

```
  npm i next-routes-extended -D
  npm i @babel/runtime
```
