
const admin = require('firebase-admin');
const db = admin.firestore();

const ERROR_MSG = 'Error. There is a server problem, please try again later';

module.exports = (app) => {
    app.get('/api/users', async (req, res) => {
        const snapshot = await db.collection('users').get()
        if (snapshot) {
            const users =  snapshot.docs.map(doc => doc.data());
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
}