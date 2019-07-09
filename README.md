# File Log Server

Basic Express Application that accepts a `POST` to write to a `log.txt` file on port `3000`.

## Installation and Setup

```sh
npm install
npm start
```

## Usage

`POST` to `/` with `message` defined in the `x-www-form-urlencoded`, for example:

```sh
curl -d "message=test" -X POST http://localhost:3000/
```
