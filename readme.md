# This is an Example of Authentication with Vue.js and Node.js using JWT tokens

![GitHub Logo](images/image1.png)
![GitHub Logo](images/image2.png)
![GitHub Logo](images/image3.png)
![GitHub Logo](images/image4.png)
![GitHub Logo](images/image5.png)

## I have Created three pages, they are as follows

- Register Page - A user is allowed to register to the Application/website with unique email, if it does not exist in the MongoDB

- Login Page - A user which exists in the DB can log in to the portal and is allowed to access the further content of the Web App.

- Dashboard Page - Once a user is Authenticated they are Re-directed to this page. It is protected and is accessible only by the Signed in user.

### All validations are done and notifications are added so that a user can see what is happening

## Below are the steps to Recreate in your local Machine or VM instance

## Project setup

### clone the Repo and change directory into the folder

- ## CLIENT

### cd to client folder and run below command in the CLI

```
npm install
```

### run below command to run the vue server

```
npm run serve
```

- ## SERVER

### go to Root directory, cd to server folder and run below commands in the CLI

> please Sign up to [mongodb atlas](https://www.mongodb.com/cloud/atlas), create a project, add a database to that project and get the Uri to connect the application to the DB. Paste the uri as a value to MongoUri key in the "server/config/keys.js" file, i have added a comment there also

> Uri will look like this String "mongodb://username:password@mongodb0.example.com:27017/?authSource=admin"

> replace the username and password with your's

```
npm install
```

```
npm i nodemon -g
```

### run below command to run the node server

```
npm run dev
```

# you can access the App on http://localhost:8080/
