const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Pass base URL to all templates
app.use((req, res, next) => {
    res.locals.baseUrl = req.protocol + '://' + req.get('host');
    next();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a simple route
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, Express!', baseUrl: res.locals.baseUrl });
});

app.get('/cats', async (req, res) => {
    const endPoint = "https://cat-fact.herokuapp.com"
    try {
        const result = await axios.get(`${endPoint}/facts`);
        console.log("Result: ", result.data)
        res.render('cats', { facts: result.data });
    } catch (err) {
        console.log("Error: ", err)
    }
    res.render('cats', { message: 'Hello Cat!' });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
