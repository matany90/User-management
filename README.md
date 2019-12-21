# Rele-Ai assignment - My implementation

## Overview:
The application is a users management tool.
Users are identified by the fields: name, email and phone.
You can add, edit, and delete users from the application.
#### Check-out deployment link:  https://rele-ai-project-matan.herokuapp.com/


## Tech-stack:
### Frontend:
  * Vue.js Framework
  * State management: VueX
  * UI library: Vuetify
### Backend:
  * Node.js with Express
    * endpoints:
        * GET - **fetchUsers**: returns an array of all users in a collection called 'users' in the firestore
        * POST - **addUser**: gets a user and adds it to the collection, and returns the added user
        * POST - **updateUser**: gets a user and updates their fields in collection by id. Returns the user after the update
        * POST - **deleteUser**: gets a user and deletes it from collection, returns deleted user
  * Firestore DB
  * Unit Test: AVAJS library. Each endpoint is checked. The files are in the path: server/tests/test.index.js
### Database structure:
The database structure is structured as follows:
  * Users Collection
      * User document identified by unique id
          * Name
          * Email
          * Phone
   
Example:![picture alt](https://imgur.com/Ah6RIeY.png)

In addition, when client-side reaches the fetchUsers endpoint, the response will be an **array of user-objects that also includes id property for each user (the unique id key from firestore).**
This way, when client-side reaches the updateUser/deleteUser endpoints, we can **compare the id we received from the client-side with all the keys in the firestore - so we can easily update/delete a user.**
This is the main reason I chose this database architecture
## Hosting
* Deployed to Heroku:  https://rele-ai-project-matan.herokuapp.com/
#### The logic works this way:
Using the vue.config.js (located at client folder) file, the client's build-production folder is created in the server folder.
In this way, the server is stored in heroku and can load the client according to the path

## Installation instructions: DEV-MODE
To run the project locally, first clone the project and then:
In root folder:
#### npm install
#### npm run server 
(server runs on port 5000)
In client folder:
#### npm install
#### npm run client
(client runs on port 8080)

## From the App:
#### Users List:
![picture alt](https://imgur.com/cI9Evea.png)
#### Add User:
![picture alt](https://imgur.com/Q1cjQqY.png)
#### Edit User:
![picture alt](https://imgur.com/DX4xrM4.png)


  
