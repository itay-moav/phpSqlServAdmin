import { Row,Col } from "react-bootstrap";
import { Route,Routes, useNavigate, useParams } from "react-router-dom";
export default function ActionsRibon(){
    return (
        
        <Row className="pl-3">
        <Col>
        <Routes>
            <Route path="/server/:server/database/:database/schema/:schema/table/:table/:link" element={<TableRibon />} />
            <Route path="/server/:server/database/:database/schema/:schema/:link" element={<DatabaseRibon />} /> 
            <Route path="/server/:server/database/:database/:link" element={<DatabaseRibon />} />
        </Routes>
        </Col>
      </Row>

    );
}



function DatabaseRibon(){
    const currentLink = useParams().link;
    return (
        <ul className="nav nav-tabs">
        <RibbonNav currentLink={currentLink} link="objects" text="DB Objects" />
        <RibbonNav currentLink={currentLink} link="sql" text="SQL" />
    </ul>
    );
}



function TableRibon(){
    const currentLink = useParams().link;
    return (
        <ul className="nav nav-tabs">
            <RibbonNav currentLink={currentLink} link="browse" text="Browse" />
            <RibbonNav currentLink={currentLink} link="search" text="Search" />
            <RibbonNav currentLink={currentLink} link="insert" text="Insert" />
            <RibbonNav currentLink={currentLink} link="sql" text="SQL" />
            <RibbonNav currentLink={currentLink} link="structure" text="Structure" />
            <RibbonNav currentLink={currentLink} link="createsql" text="CreateSQL" />
            <RibbonNav currentLink={currentLink} link="operations" text="Operations" />
        </ul>
    );
}

function RibbonNav({currentLink,link,text}){
    const navigate = useNavigate();
    return (
        <li className="nav-item">
            {(link===currentLink) ? 
                     // eslint-disable-next-line
                    (<a className="nav-link active" href="#">{text}</a>) : 
                    (<a className="nav-link" href={`../${link}`} onClick={()=>{
                        navigate("./../"+link);
                    }}>{text}</a>)}
        </li>
    );
}
