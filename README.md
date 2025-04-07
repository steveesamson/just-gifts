# Just-Gifts

## How-to

`Just-Gifts` is a simple e-commerce application with two parts:

- `The backend(API)` built with `Node.js (Express.js)` for API, `Atlas Mongo` for persistence and `Google Firebase storage` for `image CDN`.
- `The Frontend` is built with `React.js`, `React-router-dom` and a bunch of crafted `custom hooks`.

## Requirements

1. Create an application on Google Firebse with Firebase Storage - You need the application information like:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

Update the `frontend/services/firebase.js` appropriately.

2. Create a MongoDB project on Atlas; add a database. You need the database connection string. Copy it and set the `CONSTR` in `backend/services/index.js`.

# Setup

## Setup Backend

Inside the `just-gifts/backend` folders, run:

```bash
npm install
```

The above will install all dependencies for the `backend`.

## Setup Frontend

Inside the `just-gifts/frontend` folders, run:

```bash
npm install
```

The above will install all dependencies for the `frontend`

## Run (Start Backend first)

Inside the `just-gifts/backend` folders, run:

```bash
npm start
```

The above will start the application with a message like the following:

> Just Gifts backend runs at http://localhost:3000

## Run (Start Frontend last)

Inside the `just-gifts/frontend` folders, run:

```bash
npm start
```

The above will start a dev server and open in your default browserwith the following:

> Local: http://localhost:4000

Browse the URL to view application, if it does not open in your browser as expected.

# Users for test

## Admin user

- Email Address: jd@gmail.com
- Password: test

## Shopper user

- Email Address: shopper@gmail.com
- Password: test
