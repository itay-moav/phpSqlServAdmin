import { useSelector } from "react-redux";
import { findConnectionNameByServerAndDb } from '../store/dbTreeSlice';
import useCurrents from "./useCurrents";

export default function useConnectionCurrents(){
    const currents =  useCurrents();
    currents.connectionName = useSelector(findConnectionNameByServerAndDb(currents.server,currents.database));
    return currents;
}
