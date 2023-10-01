import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { PageTitle } from '../atoms';
import useCurrents from '../../services/useCurrents';
import './dbTableMenu.css';

/**
 * 
 * @returns jsx
 */
export default function DbTableMenu(){
    const {menuSchema,menuTables,schemaWithNoTable}= useSelector(state=>state.ui);
    const [selectedOwner,setSelectedOwner] = useState({});
    const {server,database,schema,table:currentTable} = useCurrents();
    useEffect(
        ()=>{
            const new_state = {};
            if(schema){
                new_state[schema] = 'open';
            }
            setSelectedOwner(new_state);
        },[schema]
    );

    //creates the table level items
    const tablesByOwner = (owner,menuTables) => menuTables.map(table=>{
                                                            const active = (owner===schema) && (currentTable === table.tName);
                                                            return (<ListGroup.Item key={table.tName} active={active}>
                                                                        &nbsp;
                                                                        <NavLink to={`server/${server}/databases/${database}/schema/${owner}/tables/${table.tName}/structure`}>
                                                                        <i className="btn fa fa-table db-element-clickable" aria-hidden="true"></i>
                                                                        </NavLink>
                                                                        {/*Temporary link to the create sql */}
                                                                        <NavLink to={`server/${server}/databases/${database}/schema/${owner}/tables/${table.tName}/createsql`}>
                                                                        <i className="btn fa fa-book db-element-clickable" aria-hidden="true"></i>
                                                                        </NavLink>
                                                                        <NavLink to={`server/${server}/databases/${database}/schema/${owner}/tables/${table.tName}/browse`}>
                                                                        <span className="table-name db-element-clickable">{table.tName}</span>
                                                                        </NavLink>
                                                                    </ListGroup.Item>);
                                                            });


    //Creates the Schema level items
    const ownerMenuItem = (owner,menuTables) => {
        const show_table_list = (selectedOwner[owner] && selectedOwner[owner] === 'open');
        const arrow = show_table_list ? 'fa-arrow-down' : 'fa-arrow-right';
        
        return (
            <ListGroup variant="flush" bsPrefix="table-list" key={owner}>
                <ListGroup.Item variant="primary" key={owner} onClick={()=>{
                                    let new_state = {...selectedOwner};
                                    new_state[owner] = show_table_list ? 'closed' : 'open';
                                    setSelectedOwner(new_state);
                                }
                            }>
                    <i className={`btn fa ${arrow}`} aria-hidden="true"></i>
                    <span className="table-name db-element-clickable">{owner}</span>
                </ListGroup.Item>
                {show_table_list && tablesByOwner(owner,menuTables)}
            </ListGroup>
        );
    };

    const menuTopLevel = menuSchema.map(owner => ownerMenuItem(owner,menuTables[owner]) ); 


    //TODO move the schema with no tables to it's own component

    return (
        <>
        <PageTitle>Schemas with tables</PageTitle>
        {menuTopLevel}
        <hr />
        {schemaWithNoTable.length>0 &&
        (<>
        <PageTitle>Schemas with no tables</PageTitle>
        <ListGroup variant="flush" bsPrefix="table-list">
                {schemaWithNoTable.map(ntschema=>{
                    return (
                    <ListGroup.Item variant="secondary" key={ntschema.schema_id}>
                        <span className="table-name">{ntschema.schema_name}</span>
                    </ListGroup.Item>
                    );
                })}
            </ListGroup>
            </>)
            }
        </>
    );
}
