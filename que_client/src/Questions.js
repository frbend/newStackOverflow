import React, {Component} from "react";
import {Link} from "@reach/router";

class Questions extends Component{

    render(){
        const list = this.props.data.map(
            elm => <><li key={elm._id}>
                <Link to={`/question/${elm._id}`}>{elm.title}<br/></Link>
            </li><br/>
            </>
            );
        return(
            <>
                <h3>Questions</h3>
                <ul>{list}</ul>
            </>
        );
    }
}

export default Questions;