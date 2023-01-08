import { Button } from "react-bootstrap";

export default function OperationCard({children,title,goHandler}){
    return (
<div className="card text-center operationCard">
  <div className="card-header text-left">
    {title}
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