import { useParams } from "react-router-dom";

export default function useCurrents(){
    return {
        server: useParams().server  || false,
        database: useParams().database || false,
        schema: useParams().schema || false,
        table: useParams().table || false
    }
}
