const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// allows for server to set up js files AND css files on load
// so we don't use a ton of app.gets()
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// makes the app listen for anything on port 3001
app.listen(PORT, () => {
    // tells us the app is on server port 3001
    console.log(`API server now on port ${PORT}!`);
});