import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Table,Alert,Modal,Button } from "react-bootstrap";
import useConnectionCurrents from "../../../../../services/useConnectionCurrents";
import { loadDatabaseTables,fetchTableList } from '../../../../../store/dbTreeSlice';
import { QueryActions,runQuery } from "../../../../../store/querySlice";
import {LastQuery,QueryResults} from "../../../../../components/query";

export default function TableIndex(){
    const [modalDanger, setModalDanger] = useState({show:false,tableName:''});
    const dispatch = useDispatch();
    const {server,database,schema,connectionName} = useConnectionCurrents();
    const dbTables = useSelector(fetchTableList(server,database));

    //init - CAREFULL, this is re-rendered and React elements
    // is reset every time you press a link, dure router dom behavior.
    // So I am adding extra conditions to not load from server if I already have data
    // ...... && !dbTables){
    useEffect(
        ()=>{
            //WARNING this is the initial load of a db list of tables
            //if for some reason it is not loaded, check this code
            //and the fetchTableList selector
            //make sure this runs only once, otherwise an empty database
            //will be in an infinite loop.
            //useEffect hopefully takes care of
            if(database && dbTables.length===0){
                dispatch(loadDatabaseTables({connectionName,server,database}));
            }
            dispatch(QueryActions.reset());
        // eslint-disable-next-line 
        },[connectionName,server,database]
    );

    //NO TABLES
    if(dbTables.length === 0){
        return (<Alert variant="warning">No tables found in database [{database}]</Alert>);
    }

    //MODAL ACTIONS
    const resetModalAction=()=>{
        setModalDanger({show:false,tableName:'',text:'',query:''});
    }

    //Start the truncate table action
    const startEmpty = tableName => {
        const alertText = (<>You are about to empty table <b>[{tableName}]</b> Are you sure?</>);
        const warningMessage = `TRUNCATE TABLE ${tableName};`;
        const query="_truncate";//this is a predefined query
        const queryParams = {tableName};

        setModalDanger({
            show:true,
            tableName,
            text:alertText,
            query:warningMessage,
            action: ()=>{
                dispatch(runQuery({ connectionName,server,database,query,queryParams}));
                resetModalAction();//just reset
            }
        });
    }

    //start the drop table action
    const startDrop = tableName => {
        const alertText = (<>You are about to DROP table <b>[{tableName}]</b> Are you sure?</>);
        const query=`DROP TABLE ${tableName};`;
        setModalDanger({
            show:true,
            tableName,
            text:alertText,
            query,
            action: async () => {
                dispatch(runQuery({ connectionName,server,database,query})).then(
                    ()=>{
                        dispatch(loadDatabaseTables({connectionName,server,database}));
                        resetModalAction();//just reset
                    }
                );

            }
        });
    }

    //if I am in schema, I remove all tables not in current schema
    let dbTablesBySchema = dbTables;
    if(schema){
        dbTablesBySchema = dbTables.filter(tr=>tr.TABLE_SCHEMA===schema);
    }

    //RENDER TABLE LISTS
    let previousSchema = '';
    return (
        <>
            <DangerAreaAction modalParams={modalDanger} onCancel={resetModalAction} />
            <LastQuery />
            <QueryResults noResults="hide" />
            <Table striped bordered hover size="sm" variant="dark">
            <tbody>
                {dbTablesBySchema.map(tr=>{
                    const key = `${tr.TABLE_SCHEMA}.${tr.TABLE_NAME}`;
                    const rootPath = `/server/${server}/database/${database}/schema/${tr.TABLE_SCHEMA}/table/${tr.TABLE_NAME}`;
                    // tobedeleted let schemaTR = null;
                    let style={};
                    if(tr.TABLE_SCHEMA !== previousSchema){
                        if(previousSchema !== ''){
                            style={borderTop:"2px solid white"};
                        }
                        previousSchema = tr.TABLE_SCHEMA;
                        //tobedeleted? schemaTR = (<tr key={tr.TABLE_SCHEMA}><td colSpan="6"><b>{tr.TABLE_SCHEMA}</b></td></tr>)
                    }
                    return (

                        <tr key={key} style={style}>
                            <td><NavLink to={`${rootPath}/structure`}>{key}</NavLink></td>
                            <td><NavLink to={`${rootPath}/structure`}>[structure]</NavLink></td>
                            <td><NavLink to={`${rootPath}/browse`}>[browse]</NavLink></td>
                            <td><span className="link" onClick={()=>{startEmpty(key)}}>[empty]</span></td>
                            <td><span className="link" onClick={()=>{startDrop(key)}}>[drop]</span></td>
                        </tr>

                )})}
            </tbody>
            </Table>
        </>
    );
}


function DangerAreaAction({modalParams,onCancel}){

    return (
        <Modal
          show={modalParams.show}
          onHide={onCancel}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          contentClassName="danger"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp; DANGER ZONE!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{modalParams.text}</h4>
            <p>{modalParams.query}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCancel} variant="secondary">Cancel</Button>
            <Button onClick={modalParams.action} variant="danger">Execute</Button>
          </Modal.Footer>
        </Modal>
      );
}
