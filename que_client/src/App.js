import React, {Component} from 'react';
import AskQuestion from "./AskQuestion";
import Questions from "./Questions";

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
        questions : [
          {id: 0, header: "Sample Header1", question: "Sample question1"},
          {id: 1, header: "Sample Header2", question: "Sample question2"},
          {id: 2, header: "Sample Header3", question: "Sample question3"},
        ]
    }
  }
  addQuestion(question, header){
    const questionObject = {
      header: header,
      question : question
    };
    this.setState({
      //new list has all old questions + new questionObject
      questions: [...this.state.questions, questionObject]
    });
  }
  changeDone(index){
    //copy of this.state.questions as newList (spread syntax)
    const newList = [...this.state.questions];
    //set state to the new copy of list
    this.setState({
      questions: newList
    })
  }



  render() {
    return (
      <>
       <div className="contents">
        <div className="element">
          <h1>New StackOverflow</h1>
          <p></p>
          <Questions questions={this.state.questions} changeDone={index => this.changeDone(index)}></Questions>
          <addQuestion addQuestion={(question) => this.addQuestion(question)}></addQuestion>
        </div>
       </div>
      </>
    );
  }
}
export default App;
