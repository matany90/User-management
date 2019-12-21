
const admin = require('firebase-admin');
const { ERROR_FTECH_USERS, ERROR_UPDATE_USER, ERROR_DELETING_USER, ERROR_ADD_USER } = require('../utils/Errors');
const db = admin.firestore();


module.exports = (app) => {
    /** FETCH USERS endpoint  **/
    app.get('/api/users', async (req, res) => {
        let users = [];
        try {
            const snapshot = await db.collection('users').get()
            /* Adding doc-firestore-id to each element
            to filter correctly when deleting/editing */
            users = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        }
        catch(error) {
            res.send({ error: ERROR_FTECH_USERS, isSuccess: false, users });
        }

        res.send({ users, isSuccess: true })
    })

    /** ADD USER endpoint **/
    app.post('/api/users/addUser', async (req, res) => {
        const { name, email, phone } = req.body.user;
        let doc;
        //add user
        try {
            const dbRes = await db.collection('users').add({
                name,
                email,
                phone
            })
            //pull new user to assign id to user object
            doc = await db.collection('users').doc(dbRes.id).get();
        }
        catch(error) {
            res.send({ error: ERROR_ADD_USER, isSuccess: false });
        }
        const user = {...doc.data(), id: doc.id }

        res.send({ user, isSuccess: true })
    })

    /** DELETE USER endpoint **/
    app.post('/api/users/deleteUser', async (req, res) => {
        const { id } = req.body.user;
        //delete by user id
        try {
            await db.collection('users').doc(id).delete();
        }
        catch(error) {
            res.send({ error: ERROR_DELETING_USER, isSuccess: false });
        }

        res.send({ user: req.body.user, isSuccess: true})
    })

    /** UPDATE USER endpoint **/
    app.post('/api/users/updateUser', async (req, res) => {
        const { user } = req.body;
        //update by user id
        try {
            await db.collection('users').doc(user.id).update('name', user.name, 'email', user.email, 'phone', user.phone)
        }
        catch(error) {
            res.send({ error: ERROR_UPDATE_USER, isSuccess: false });
        }
         //console.log(typeof response)

        res.send({ user, isSuccess: true });
    })
}