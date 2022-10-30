import { Form,Button } from "react-bootstrap";
import {useDispatch} from 'react-redux';
import useCurrents from "../../services/useCurrents";
import { Jumbotron } from "../atoms";
import {runQuery} from "../../store/querySlice";

const QueryEditor = () => {
    const dispatch = useDispatch();
    const {server,database} = useCurrents();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        console.log('ABOUT TO RUN',form.queryEditorArea.value);
        dispatch(runQuery(server,database,form.queryEditorArea.value));
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
