
const admin = require('firebase-admin');
const _ = require('lodash');
const db = admin.firestore();

const ERROR_MSG = 'Error. There is a server problem, please try again later';
const ERROR_UPDATE_USER = 'User has not changed! '
const ERROR_ADD_USER = 'Error adding user!'

module.exports = (app) => {
    /** FETCH USERS endpoint  **/
    app.get('/api/users', async (req, res) => {
        const snapshot = await db.collection('users').get()
        /* Adding doc-firestore-id to each element
        to filter correctly when deleting/editing */
        const users = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        res.send({ users })
    })

    /** ADD USER endpoint **/
    app.post('/api/users/addUser', async (req, res) => {
        const { name, email, phone } = req.body.user;
        //add user
        const dbRes = await db.collection('users').add({
            name,
            email,
            phone
        })
        //pull new user to assign id to user object
        const doc = await db.collection('users').doc(dbRes.id).get();
        const user = {...doc.data(), id: doc.id }

        res.send({ user })
    })

    /** DELETE USER endpoint **/
    app.post('/api/users/deleteUser', async (req, res) => {
        const { id } = req.body.user;
        //delete by user id
        await db.collection('users').doc(id).delete();

        res.send({ user: req.body.user})
    })

    /** UPDATE USER endpoint **/
    app.post('/api/users/updateUser', async (req, res) => {
        const { user } = req.body;
        //update by user id
        await db.collection('users').doc(user.id).update('name', user.name, 'email', user.email, 'phone', user.phone);
        
        res.send({ user });
    })
}