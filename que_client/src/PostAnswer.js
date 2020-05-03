import React, {Component} from 'react';
import {Link} from '@reach/router';

class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.answer);
    }

    render() {
        return (
            <>
                <h3>Answer: </h3>
                <input name="answer" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post Answer</button>
            </>
        )
    }
}

export default PostAnswer;

