# server

Contento Test Task Server

## Quick Start

Get started developing...

```shell
# install deps
yarn install

# run in development mode
yarn run dev

# run tests
yarn run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
yarn run dev
```

or debug it

```shell
yarn run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
yarn run compile
yarn start
```

## Test It

Run the Mocha unit tests

```shell
yarn test
```

or debug them

```shell
yarn run test:debug
```

## Try It
* Open you're browser to [http://localhost:3002](http://localhost:3002)
* Invoke the `/content-item` endpoint 
  ```shell
  curl http://localhost:3002/api/v1/content-item?page_no=0&page_size=10
  ```


## Debug It

#### Debug the server:

```
yarn run dev:debug
```

#### Debug Tests

```
yarn run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file