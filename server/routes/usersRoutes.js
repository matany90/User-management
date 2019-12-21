
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
        if (snapshot) {
            const users =  snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return res.send({ users, isSuccess: true })
        }
        return res.send({ error: ERROR_MSG, isSuccess: false })
    })

    /** ADD USER endpoint **/
    app.post('/api/users/addUser', async (req, res) => {
        const { name, email, phone } = req.body.user;
        //add user
        const response = await db.collection('users').add({
            name,
            email,
            phone
        })
        //pull new user
        const doc = await db.collection('users').doc(response.id).get();
        //check if added successfully
        const isSuccess = doc.id === response.id;
        isSuccess ? res.send({ user: {...doc.data(), id: doc.id }, isSuccess }) : res.send({ error: ERROR_ADD_USER, isSuccess })
    })

    /** DELETE USER endpoint **/
    app.post('/api/users/deleteUser', async (req, res) => {
        const { id } = req.body.user;
        //delete by user id
        await db.collection('users').doc(id).delete();
        //check if deleted successfully
        const doc = await db.collection('users').doc(id).get();
        doc.exists ? res.send({ error: ERROR_MSG, isSuccess: false }) : res.send({ user: req.body.user, isSuccess: true })
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
        isSuccess ? res.send({ user: updatedUser, isSuccess }) : res.send({ error: ERROR_UPDATE_USER, isSuccess })
    })
}