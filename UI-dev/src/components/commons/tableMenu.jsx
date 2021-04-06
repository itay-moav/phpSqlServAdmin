import React from "react";
import {useSelector,useDispatch} from 'react-redux';
import { Container, Row, Col,Button,ListGroup } from "react-bootstrap";
import {fetchTableFields,runQuery} from "../../store/api";

import './tableMenu.css';
const TableMenu = () => {
    const dispatch = useDispatch();
    //TODO create as a selector function in the proper place
    const tableList = useSelector(state => (state.databases.current ? state.databases.list[state.databases.current] : []) );
    
    return (  
        <ListGroup variant="flush" bsPrefix="table-list">
            {tableList.map(table=>(
                <ListGroup.Item key={table.name}>
                        {table.name}
                        <Button onClick={()=>dispatch(runQuery(
                            `SELECT * FROM [${table.name}]`
                        ))} variant="outline-light" className="float-right" size="sm">
                            <i className="fa fa-server" aria-hidden="true"></i>
                        </Button>
                        
                        <Button onClick={()=>dispatch(fetchTableFields(table.name))} variant="outline-light" className="float-right" size="sm">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </Button>
                    </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
 
export default TableMenu;