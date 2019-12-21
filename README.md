# Rele-Ai assignment - My implementation

## Overview:
The application is a user pool management tool.
Users are identified by the fields: name, email and phone.
You can add, edit, and delete users from the application.


## Tech-stack:
### Frontend:
  * Vue.js Framework
  * State management: VueX
  * UI library: Vuetify
### Backend:
  * Node.js with Express
    * endpoints:
        * fetchUsers: returns an array of all users in a collection called 'users' in the firestore
        * addUser: adds a user to the collection and returns the added user
        * updateUser: gets a user and updates their fields in collection by id. Returns the user after the update
        * deleteUser: deletes user from collection and returns deleted user
  * Firestore DB
### Database structure:
The database structure is structured as follows:
  * Users Collection
      * User document identified by unique id
          * Name
          * Email
          * Phone
   
Example:![picture alt](https://imgur.com/Ah6RIeY.png)

In addition, when client-side reaches the fetchUsers endpoint, the response will be an array that also includes id property (the unique id key from firestore).
This way, when client-side reaches the updateUser/deleteUser endpoints, we can compare the id we received from the client-side with all the keys in the firestore - so we can easily update/delete a user.
This is the main reason I chose this database architecture
  
  
  
