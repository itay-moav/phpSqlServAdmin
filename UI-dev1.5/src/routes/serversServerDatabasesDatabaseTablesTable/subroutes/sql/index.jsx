import {LastQuery,QueryEditor,QueryResults} from "../../../../components/query";
import FieldsHelper from "../../fieldsHelper";
export default function TableSql(){
    const rightCP = (textArea) => <FieldsHelper textArea={textArea} />;

    return (
        <>
            <QueryEditor rightCP={rightCP}/>
            <LastQuery />
            <QueryResults />
        </>
    );
}
