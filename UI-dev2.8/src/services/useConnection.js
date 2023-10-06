import { useParams } from "react-router-dom";

export default function useConnection(){
    return useParams().server || false;
}
