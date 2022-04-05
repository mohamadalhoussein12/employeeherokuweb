# EmployeeDesk
EmployeeDesk a an employees management website.
This website is available under this link: [https://employees-desk-web.herokuapp.com/](https://employees-desk-web.herokuapp.com/)

### Website Functionalities:
- create/edit and delete employees
- View employees by department, location and search for employees by name and email

## FrontEnd
React is used for the front with functional components, hooks, react redux and material ui.

To run the frontend web, there are 2 environments:
for Local environment which is connected to local server and needs it running on port 3000 to run, run the following commands:

```
cd front
gulp set:local
npm start
```
gulp will set the server url to http://localhost:3000/api

For production environment, run the following commands:

```
cd front
gulp set:prod
npm start
```
gulp will set the server url to [https://employeesdesk.herokuapp.com/api](https://employeesdesk.herokuapp.com/api)

## BackEnd
Backend is built using Nodejs express and mongoose for mongodb

To run the backend, there are 2 environments:
Local:
To run server locally, a local mongodb shoould be created
runs the server locally on default port 3000 and connects it to local mongo db using these commands

```
cd server
gulp set:local
npm run dev
```

Prod: runs the server locally on default port 3000 and connects it to mongodb hosted on atlas (db link can be found in constants.js file) using the following commands:

```
cd server
gulp set:prod
npm run dev
```

## Unit Testing
Unit tests are implemented on the server side using mocha, chai and chai-http
unit tests can be executed using the following commands:

```
cd server
gulp set:local or gulp set:prod
npm test
```

## Database and Data Creation
Mongoose is used to perform mongo queries to the database. There are 2 environments local and prod.
Random data are created in the database using [https://randomuser.me/api/](https://randomuser.me/api/)
Random employees are created with random names, images and emails using this api. We assign random department and location to each employee on creation.
This is done in dbScripts in scripts directory.

Local:
to run we need mongodb service running locally, then run the following commands:
```
cd server
gulp set:local
npm run database
```


Prod:
Running this will connect to prod db and insert random employees with departments and locations to it.
```
cd server
gulp set:prod
npm run database
```
