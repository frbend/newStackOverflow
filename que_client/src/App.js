import React, {Component} from 'react';
import {Router} from "@reach/router";
import Question from "./Question";
import Questions from "./Questions";
import {Link} from "@reach/router"
import AskQuestion from "./AskQuestion";

class App extends Component{


  constructor(props){
    super(props);
    this.state = {
        questions : []
    }
  }

  componentDidMount() {
    this.getData().then(() => console.log("received questions"));
  }
  async getData() {
    const url = "http://localhost:8080/api/questions";
    const response = await fetch(url);
    const data = await response.json();
   return this.setState({
      questions: data
    })
  }

  getQuestion(id){
    return this.state.questions.find(question => question._id === id);
    };


  async postQuestion(title, desc) {

    console.log("postQuestion", title, desc);
    const url = `http://localhost:8080/api/questions`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title: title,
        desc: desc,
        answers: []
      })
    });
    const data = await response.json();
    console.log("Printing the response:", data);
    this.getData()
  };




  async postAnswer(answer, questionId) {
    console.log("postAnswer", answer, questionId);
    const url = `http://localhost:8080/api/questions/${questionId}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        text: answer
      })
    });
    const data = await response.json();
    console.log("Printing the response:", data);
  };

  setAnswer(answer, questionId){
    if(answer!==""){
      this.postAnswer(answer, questionId);
      this.getData();
    }
  }

  vote(questionID, answerID, isUpvote) {
    let stateCopy = this.state.questions;
    let targetQuestion = stateCopy.find(question => question._id === questionID);
    let targetAnswer = targetQuestion.answers.find(answer => answer._id === answerID);

    console.log(targetQuestion + targetAnswer);
    if (isUpvote) {
      targetAnswer.votes ++;
    } else {
      targetAnswer.votes --;
    }

    this.setState({
      questions: stateCopy
    });
  }

  async voting(answer, questionId) {
    const response = await fetch(`http://localhost:8080/api/questions/${questionId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        text: answer
      })
    });
    const data = await response.json();
    console.log("printing the response:", data);
  }

  render() {
    return (
      <>
        <h1>New StackOverflow</h1>
        <Router>
          <Questions path="/" data={this.state.questions}
          ></Questions>
          <Question path="/question/:id"
                    getQuestion={(id) => this.getQuestion(id)}
                    submit={(answer, questionId) => this.setAnswer(answer, questionId)}
                    vote={(questionId, answerID, isUpvote) => this.vote(questionId, answerID, isUpvote)}></Question>
          <AskQuestion path="/new" submit={(title,desc) => this.postQuestion(title,desc)}></AskQuestion>
        </Router>
        <Link to="/new">Ask new Question</Link><br/>
        <Link to="/">Back</Link>
      </>
    );
  }
}
export default App;
