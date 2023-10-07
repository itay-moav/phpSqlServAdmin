import useConnectionCurrents from "./useConnectionCurrents";
export default function useConnection(){
    return useConnectionCurrents().connectionName;
}
