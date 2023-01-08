import { Button,ButtonToolbar } from "react-bootstrap";

export default function OperationCard({children,title,goHandler,copyText}){

    /*************************************************
     * COPY ICON
     *************************************************/

    const copy =()=>{
      if(copyText){
        window.navigator.clipboard.writeText(copyText);
      }
    }
  
    return (
    <div className="card text-center operationCard">
      <div className="card-header text-left">
        {title}
        {copyText &&
        (<ButtonToolbar className="pull-right mb-1">
            <Button onClick={copy} variant="secondary" title="Copy to clipboard"><i className="fa fa-copy" aria-label="Copy to clipboard"></i></Button>
        </ButtonToolbar>)
        }
      </div>
      <div className="card-body text-left">
      {children}
      </div>
      {goHandler && (
        <div className="card-footer text-right">
        <Button>GO</Button>
        </div>  
      )}
      
    </div>
    );
}