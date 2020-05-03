const express = require('express');
const router = express.Router();

//Item model
const  Question = require('../../models/Questions');

//@route GET Api/questions
//@desc Get all items
router.get('/', (req,res) => {
    Question.find()
        .then(questions => res.json(questions))
});


module.exports = router;