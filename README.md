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
  * Firestore DB
### Database structure:
The database structure is structured as follows:
  * Users Collection
      * User document identified by unique id
          * Name
          * Email
          * Phone
   
Example:![picture alt](https://imgur.com/Ah6RIeY.png)
In addition, when the client-side reaches the fetchUser endpoint, the response will be an array that also includes the unique id key.
This way, when the client-side reaches the updateUser/deleteUser endpoints, we can compare the id we received from the client-side with all the keys in the firestore - so we can easily update/delete a user.
This is the main reason I chose this database architecture
  
  
  
