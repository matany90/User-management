
const admin = require('firebase-admin');
const _ = require('lodash');
const db = admin.firestore();

const ERROR_MSG = 'Error. There is a server problem, please try again later';
const ERROR_UPDATE_USER = 'User has not changed! '
const ERROR_ADD_USER = 'Error adding user!'

module.exports = (app) => {
    /** FETCH USERS endpoint  **/
    app.get('/api/users', async (req, res) => {
        let response;
        const snapshot = await db.collection('users').get()
        /* Adding doc-firestore-id to each element
        to filter correctly when deleting/editing */
        if (snapshot) {
            const users =  snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            response = { users, isSuccess: true };
        }
        else {
            response = { error: ERROR_MSG, isSuccess: false };
        }

        res.send(response)
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
        //pull new user
        const doc = await db.collection('users').doc(dbRes.id).get();
        //check if added successfully
        const isSuccess = doc.id === dbRes.id;
        const response = isSuccess ? { user: {...doc.data(), id: doc.id }, isSuccess } : { error: ERROR_ADD_USER, isSuccess }

        res.send(response)
    })

    /** DELETE USER endpoint **/
    app.post('/api/users/deleteUser', async (req, res) => {
        const { id } = req.body.user;
        //delete by user id
        await db.collection('users').doc(id).delete();
        //check if deleted successfully
        const doc = await db.collection('users').doc(id).get();
        const response =  doc.exists ? { error: ERROR_MSG, isSuccess: false } : { user: req.body.user, isSuccess: true };

        res.send(response)
    })

    /** UPDATE USER endpoint **/
    app.post('/api/users/updateUser', async (req, res) => {
        const { user } = req.body;
        //update by user id
        await db.collection('users').doc(user.id).update('name', user.name, 'email', user.email, 'phone', user.phone);
        //pull updated user
        const doc = await db.collection('users').doc(user.id).get();
        const updatedUser = doc.exists ? {...doc.data(), id: user.id }: {};
        //check if updated successfully
        const isSuccess = _.isEqual(updatedUser, user);
        const response = isSuccess ? { user: updatedUser, isSuccess } : { error: ERROR_UPDATE_USER, isSuccess }

        res.send(response);
    })
}