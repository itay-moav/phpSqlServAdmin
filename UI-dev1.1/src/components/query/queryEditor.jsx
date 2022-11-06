import { Form,Button } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux';
import useCurrents from "../../services/useCurrents";
import { Jumbotron } from "../atoms";
import {runQuery} from "../../store/querySlice";
import { findConnectionNameByDbOrServer } from '../../store/dbTreeSlice';

const QueryEditor = () => {
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const payload={connectionName,server,database,query:form.queryEditorArea.value};
        dispatch(runQuery(payload));
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
