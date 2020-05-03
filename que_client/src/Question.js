import React, {Component} from "react";
import PostAnswer from "./PostAnswer";
import {Link} from '@reach/router';

class Question extends Component {

    submit(answer) {
        this.props.submit(answer, this.props.id);
    }

    vote(answerID, isUpvote) {
        this.props.vote(this.props.id, answerID, isUpvote);

    }

   renderAnswers(){
        const question = this.props.getQuestion(this.props.id);
        if (question === undefined){
            return <p>Mm..nothing here</p>
        }
        else {
            return question.answers.map(answer => <section>
                <ul>
                    <li>{answer.text}</li>
                    <p>Votes: {answer.votes}</p>
                    <button onClick={() => this.vote(answer._id, true)}>✓</button>
                    <button onClick={() => this.vote(answer._id, false)}>x</button>
                </ul>
            </section>);
        }
   }

    render(){
        const question = this.props.getQuestion(this.props.id);



        return(
            <>
                <h2>{question.title}</h2>
                <p>{question.desc}</p>
                <h3>Answers</h3>

                <section>{this.renderAnswers()}</section>
                <PostAnswer submit={(answer) => this.submit(answer)}></PostAnswer>
            </>
        );
    }
}

export default Question;