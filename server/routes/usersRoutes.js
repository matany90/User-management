
module.exports = (app) => {
    app.get('/api/users', (req, res) => {
        res.send({ users: [{name: 'Matan', email: 'matany90@gmail.com', phone: '0522542570'}] })
    })
}