import React, {Component} from 'react';
import {Link} from "@reach/router";

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.title, this.state.desc);
    }

    render() {
        return (
            <>
                <p>Question:</p>
                <input name="title" type="text" onChange={event => this.onChange(event)}/>
                <p>Description:</p>
                <input name="desc" type="text" onChange={event => this.onChange(event)}/>
                <p></p>
                <button onClick={_ => this.onSubmit()}>Ask Question</button>
            </>
        )
    }
}

export default AskQuestion;