import React from "react";
import { Jumbotron,Form,Button } from "react-bootstrap";
import {useDispatch} from 'react-redux';
import {runQuery} from "../../store/api";

const QueryEditor = () => {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        console.log('ABOUT TO RUN',form.queryEditorArea.value);
        dispatch(runQuery(form.queryEditorArea.value));
    };

    return (  
        <Jumbotron>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="queryEditorArea">
                <Form.Control as="textarea" rows={5} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Run Query
            </Button>
        </Form>
        </Jumbotron>
    );
}
 
export default QueryEditor;
