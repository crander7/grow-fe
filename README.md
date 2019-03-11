# Grow-fe

## Getting Started

```bash
yarn install
```

## Running Dev Server
```bash
yarn dev
```

## Building and Running Production Server
```bash
yarn build
yarn start-local or yarn start
```
yarn start-local will start the project in production mode with node.
yarn start will start it in production mode with pm2.

## Stopping the Production Server
yarn start will start the project with pm2. PM2 is similar to forever, it will keep the app alive even if it crashes, but pm2 will let us tag running processes for easier operations.
```bash
yarn stop or yarn end
```
yarn stop will stop the process. yarn end will stop it and delete it from pm2.

## Usage
In dev mode it is accessible from http://localhost:3000
In production it is accessible from http://localhost:3001
