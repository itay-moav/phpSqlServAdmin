import { useNavigate } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux';
import useCurrents from "../../services/useCurrents";
import { Jumbotron } from "../atoms";
import {runQuery} from "../../store/querySlice";
import { findConnectionNameByDbOrServer } from '../../store/dbTreeSlice';
import { useRef } from "react";

const QueryEditor = () => {
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const navigate = useNavigate();
    const textAreaRef = useRef(null)

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const payload={connectionName,server,database,query:form.queryEditorArea.value};
        const response = await dispatch(runQuery(payload)).unwrap();
        if(response.triggerNav){
            navigate(`/servers/${server}/databases/${database}/tables/${response.triggerNav}`);
        }
    };

    const paste =()=>{
        navigator.clipboard.readText().then((a)=>{
            textAreaRef.current.value=a;
        } );
    }

    return (  
        <Jumbotron>
        <span onClick={paste}>paste</span>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="queryEditorArea">
                <Form.Control as="textarea" rows={5} ref={textAreaRef} />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-1">
                Run Query
            </Button>
        </Form>
        </Jumbotron>
    );
}
 
export default QueryEditor;
