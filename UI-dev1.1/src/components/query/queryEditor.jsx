import { useNavigate } from "react-router-dom";
import { Form,Button,ButtonToolbar } from "react-bootstrap";
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
    const hiddenFileInputRef = useRef(null);

    // Sends query in textarea to server to run
    const runQueryFromTextArea = async () => {
        const payload={ connectionName,server,database,query:textAreaRef.current.value };
        const response = await dispatch(runQuery(payload)).unwrap();
        if(response.triggerNav){
            navigate(`/servers/${server}/databases/${database}/tables/${response.triggerNav}`);
        }
    };

    /*********************************************************
     * TOOL BAR 
     *********************************************************/


    /*************************************************
     * PASTE ICON
     *************************************************/
    const paste =()=>{
        navigator.clipboard.readText().then((a)=>{
            textAreaRef.current.value=a;
        } );
    }

    /*************************************************
     * ERASER ICON
     *************************************************/
     const empty =()=>{
        textAreaRef.current.value='';
    }

    /*************************************************
     * UPLOAD ICON
     *************************************************/

    // starts to read the uploaded file
    const runFromLocalfile = (e)=>{
        const fileReader = new FileReader();
        const file = e.target.files[0];
        console.log('FILE',file);
        fileReader.onload = handleFileRead;
        fileReader.readAsText(file);
    }

    // Fills the textarea with file content and
    // triggers "Run Query"
    const handleFileRead = (e) => {
        const content = e.target.result;
        textAreaRef.current.value=content;
        runQueryFromTextArea();

    }

    // Triggers the hidden fileupload, this opens the upload screen
    const fireUploadFile = ()=>{
        hiddenFileInputRef.current.click();
    }

    /*********************************************************
     * EOF --- TOOL BAR
     *********************************************************/


    return (  
        <Jumbotron>
            <ButtonToolbar className="pull-right mb-1">
                <input type="file" ref={hiddenFileInputRef} onChange={runFromLocalfile} style={{display: 'none'}} />
                <Button onClick={fireUploadFile} variant="secondary" title="Run from local file" className="mr-1"><i className="fa fa-upload" aria-hidden="true"></i></Button>
                <Button onClick={empty} variant="secondary" title="Empty" className="mr-1"><i className="fa fa-eraser" aria-hidden="true"></i></Button>{' '}
                <Button onClick={paste} variant="secondary" title="Paste from clipboard"><i className="fa fa-clipboard" aria-label="Paste from clipboard"></i></Button>
            </ButtonToolbar>

            <Form.Group controlId="queryEditorArea">
                <Form.Control as="textarea" rows={5} ref={textAreaRef} />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-1" onClick={runQueryFromTextArea}>
                Run Query
            </Button>
        </Jumbotron>
    );
}
 
export default QueryEditor;
