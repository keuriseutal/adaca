const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect to db
connectDB();

//initialize middleware
app.use(express.json({ extended: false })); // to accept json as body on request

// app.get('/', (request, response) => {
//     response.json({ msg: 'Welcome to the contact keeper API' });
// });

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

//server static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));