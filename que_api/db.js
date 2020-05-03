class Db {
    constructor(mongoose){
        const questionSchema = new mongoose.Schema({
            title: String,
            desc: String,
            answers: [{
                text: String,
                votes: Number
            }]
        });
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions(){
        try{
            return await this.questionModel.find({});
        }catch (error) {
            console.error("getQuestions: ", error.message);
            return {};
        }
    }
    async getQuestion(id){
        try{
            return await this.questionModel.findById(id);
        }catch (error) {
            console.error("getQuestion: ", error.message);
            return {};
        }
    }
    async createQuestion(newQuestion){
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }
    async createAnswer(id, newAnswer){
        let answer = {
            text : newAnswer,
            votes: 0
        };
        const question = await this.getQuestion(id);
        question.answers.push(answer);
        return await question.save();
    }
    async vote(){}

/***some dummy data ***/
async fillIfEmpty() {

    let l = (await this.getQuestions()).length;
    console.log("Question collection size:", l);

    if (l === 0) {
        console.log("Adding data test data into empty db!");
        let promises = [];
        let question1 = new this.questionModel({
            title: "How to add Bootstrap to React?",
            desc: "I like bootstrap because then i don't have to learn CSS! But it doesn't work.",
            answers: []
        });

        promises.push(question1.save());

        let question2 = new this.questionModel({
            title: "Class vs Functions in React?",
            desc: "This is a mess.",
            answers: []
        });

        promises.push(question2.save());

        let question3 = new this.questionModel({
            title: "Who is your father Luke?",
            desc: "Hint..His name was Anakin Skywalker.",
            answers: []
        });

        promises.push(question3.save());

        let question4 = new this.questionModel({
            title: "I heard that new StackOverflow is being build, is that true?",
            desc: "Can somebody send a link??",
            answers: []
        });

        promises.push(question4.save());

        let question5 = new this.questionModel({
            title: "Random question",
            desc: "I ran out of ideas.",
            answers: []
        });

        promises.push(question5.save());

        let question6 = new this.questionModel({
            title: "What is React?",
            desc: "I heard it uses Javascript, is that true?",
            answers: [
                {
                    id: 0,
                    text: "It's pretty awesome, you should try it!",
                    votes: 12
                },
                {
                    id: 1,
                    text: "They have also great documentation!",
                    votes: 2
                },
                {
                    id: 2,
                    text: "I don't like it.",
                    votes: -4
                }
            ]
        });

        promises.push(question6.save());

        let question7 = new this.questionModel({
            title: "Random question6",
            desc: "No more ideas:((",
            answers: [

                {
                    id: 0,
                    text: "Bad answer",
                    votes: -5
                },
                {
                    id: 1,
                    text: "Good answer",
                    votes: 7
                },
                {
                    id: 2,
                    text: "Awesome answer",
                    votes: 15
                },
                {
                    id: 3,
                    text: "Average answer",
                    votes: 4
                }
            ]
        });

        promises.push(question7.save());

        return Promise.all(promises);
    }
}
}

module.exports = mongoose => new Db(mongoose);