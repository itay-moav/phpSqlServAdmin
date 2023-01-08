
export default function OperationCard({children,title}){
    return (
<div className="card text-center operationCard">
  <div className="card-header text-left">
    {title}
  </div>
  <div className="card-body text-left">
   {children}
  </div>
  <div className="card-footer text-right">
    GO
  </div>
</div>
    );
}