import { useNavigate } from "react-router-dom";
import { Form,Button,ButtonToolbar,Row,Col } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux';
import useCurrents from "../../services/useCurrents";
import { Jumbotron } from "../atoms";
import {runQuery,QueryActions} from "../../store/querySlice";
import { findConnectionNameByServerAndDb } from '../../store/dbTreeSlice';
import { useRef } from "react";

const QueryEditor = ({runTriggers,rightCP}) => {
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByServerAndDb(server,database));
    const navigate = useNavigate();
    const textAreaRef = useRef(null)
    const hiddenFileInputRef = useRef(null);
    const injectRightCp = rightCP ? rightCP(textAreaRef) : null;

    // Sends query in textarea to server to run
    const runQueryFromTextArea = async () => {
        const payload={ connectionName,server,database,query:textAreaRef.current.value };
        const response = await dispatch(runQuery(payload)).unwrap();
        if(response.triggerNav){
            navigate(`/servers/${server}/databases/${database}/tables/${response.triggerNav}`);
        } else if(runTriggers){
            runTriggers();
        }
    };

    /*********************************************************
     * TOOL BAR 
     *********************************************************/

    /*************************************************
     * COPY ICON
     *************************************************/
     const copy =()=>{
        textAreaRef.current.select();
        textAreaRef.current.setSelectionRange(0, 99999);
        window.document.execCommand('copy');
        textAreaRef.current.setSelectionRange(0,0);
    }

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
        dispatch(QueryActions.manualSetLastQuery(`UPLOADING FILE: [${file.name}]`));
    }

    // Fills the textarea with file content and
    // triggers "Run Query"
    const handleFileRead = (e) => {
        const content = e.target.result;
        textAreaRef.current.value=content;
        //disabling - let user trigger the run after he verifies what he uploaded --- runQueryFromTextArea();

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
            <Row>
                <Col>
                <ButtonToolbar className="pull-right mb-1">
                    <input type="file" ref={hiddenFileInputRef} onChange={runFromLocalfile} style={{display: 'none'}} />
                    <Button onClick={runQueryFromTextArea} variant="secondary" title="Run query" className="mr-1"><i className="fa fa-play" aria-hidden="true"></i></Button>
                    <Button onClick={fireUploadFile} variant="secondary" title="Run from local file" className="mr-1"><i className="fa fa-upload" aria-hidden="true"></i></Button>
                    <Button onClick={empty} variant="secondary" title="Empty" className="mr-1"><i className="fa fa-eraser" aria-hidden="true"></i></Button>
                    <Button onClick={paste} variant="secondary" title="Paste from clipboard" className="mr-1"><i className="fa fa-paste" aria-label="Paste from clipboard"></i></Button>
                    <Button onClick={copy} variant="secondary" title="Copy to clipboard"><i className="fa fa-copy" aria-label="Copy to clipboard"></i></Button>
                </ButtonToolbar>
                <Form.Group controlId="queryEditorArea">
                    <Form.Control as="textarea" rows={5} ref={textAreaRef} />
                </Form.Group>
                </Col>
                {injectRightCp}
            </Row>
            <Row>
                <Col className="mt-3">
                <Button variant="primary" type="submit" className="mt-1" onClick={runQueryFromTextArea} tabIndex="0">
                    Run Query
                </Button>
                </Col>
            </Row>
        </Jumbotron>
    );
}
 
export default QueryEditor;




/* EXAMPLES : TODO make an MD with this

<QueryEditor runTriggers={()=>navigate('./../sql')} rightCP={rightCP} />


1. This will trigger navigate('./../sql') after query has finished running.
2. (not related to 1) this will render <rightCp /> (what ever it is) on the 
   last two or three Col of the Query Editor, shrinking the width of the SQL textaread

*/