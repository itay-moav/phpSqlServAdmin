import React from "react";
import {useSelector,useDispatch} from 'react-redux';
import { ListGroup } from "react-bootstrap";
import {fetchTableFields,runQuery} from "../../store/api";

import './dbTableMenu.css';
const DbTableMenu = () => {
    const dispatch = useDispatch();
    //TODO create as a selector function in the proper place
    const tableList = useSelector(state => (state.databases.current ? state.databases.tableList[state.databases.current] : []) );
    
    return (  
        <ListGroup variant="flush" bsPrefix="table-list">
            {tableList.map(table=>(
                <ListGroup.Item key={table.name}>
                        <i className="btn fa fa-database db-element-clickable" aria-hidden="true" onClick={()=>dispatch(fetchTableFields(table.name))}></i>
                        <span className="table-name db-element-clickable" onClick={()=>dispatch(runQuery(
                            `SELECT * FROM [${table.name}]`
                        ))}>{table.name}</span>
                    </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
 
export default DbTableMenu;