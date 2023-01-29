import "./tableWithActions.css";
/*TOBEDELETED20230128*/
export default function TableWithActions({children}){
    return (
        <table className="table table-dark table-w-actions table-sm table-striped table-bordered table-hover">{children}</table>
    );
}