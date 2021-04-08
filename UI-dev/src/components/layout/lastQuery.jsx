import React from "react";
import {useSelector} from "react-redux";
import { Jumbotron } from "react-bootstrap";

const LastQuery = () => {
    //TODO create as a selector function in the proper place
    const query = useSelector(state => (state.query.lastQuery) );
    if(!query.length) return null;
    
    return (  
        <Jumbotron>
            <h3>Last query</h3>
            <pre>{query}</pre>
        </Jumbotron>
    );
}
 
export default LastQuery;
