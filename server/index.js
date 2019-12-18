const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//express app instance
const app = express();

//fix cors problem
app.use(cors());

 //make POST req include the body to req obj
app.use(bodyParser.json());

require('./routes/usersRoutes')(app);

//Handle Production
if (process.env.NODE_ENV === 'production') {
    //client static folder
    app.use(express.static(__dirname, '/public/'));
    //single page application
    app.get('*', (req, res) => res.sendFile(__dirname, '/public/index.html'));
}

const PORT = process.env.PORT || 5000; // listen to Heroku's given port (prod), or take 5000 (dev)
app.listen(PORT);
