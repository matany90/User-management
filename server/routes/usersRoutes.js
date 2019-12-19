
const admin = require('firebase-admin');
const db = admin.firestore();

const ERROR_MSG = 'Error. There is a server problem, please try again later';

module.exports = (app) => {
    app.get('/api/users', async (req, res) => {
        const snapshot = await db.collection('users').get()
        if (snapshot) {
            /* Adding doc-firestore-id to each element
             to filter correctly when deleting/editing*/
            const users =  snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return res.send({ users })
        }
        return res.send({ error: ERROR_MSG })
    })

    app.post('/api/users/addUser', async (req, res) => {
        const { name, email, phone } = req.body.user;

        const responseDb = await db.collection('users').add({
            name,
            email,
            phone
        })
        if (responseDb) {
            return res.send({ responseDb });
        }
        return res.send({ error: ERROR_MSG })
    })

    app.post('/api/users/deleteUser', async (req, res) => {
        const { id } = req.body.user;
        const responseDb = await db.collection('users').doc(id).delete();
        res.send({ responseDb })
    })

    app.post('/api/users/updateUser', async (req, res) => {
        const { id, name, email, phone } = req.body.user;
        const responseDb = await db.collection('users').doc(id).update('name', name, 'email', email, 'phone', phone);
        res.send({ responseDb })
    })
}