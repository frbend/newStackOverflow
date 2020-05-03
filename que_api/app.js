/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require ('path');

/**** Configuration ****/
const appName = "Express API"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../que_client/build')); // Needed for serving production build of React

/*** Database ***/
const mongoDb = require('./db')(mongoose);


/**** Routes ****/

// Return all questions in data
app.get('/api/questions', async (req, res) =>{
    const questions = await mongoDb.getQuestions();
    console.log(questions);
 res.json(questions);
});

app.get('/api/questions/:id', async (req, res) =>{
    let id = req.params._id;
    const question = await mongoDb.getQuestion(id);
    res.json(question);
});


//PostQuestion
app.post('/api/questions/', async (req, res) => {
    let question = {
        id: Math.random(),
        title: req.body.title, //important
        desc: req.body.desc
    };
    const newQuestion = await mongoDb.createQuestion(question);
    res.json(newQuestion);
});


// PostAnswer
app.post('/api/questions/:id', async (req, res) => {
    let questionId = req.params.id;
    const newAnswer = await mongoDb.createAnswer(questionId, req.body.text);
    res.json(newAnswer);
});

//Voting
app.put('api/answer/:id', async (req, res) => {
    let answerId = req.params.id;
});


app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start! ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/mongodb_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async() =>{
        await mongoDb.fillIfEmpty();
        await app.listen(port); //API
        console.log(`API running on port ${port}`);
    })
    .catch(error => console.log(error));
