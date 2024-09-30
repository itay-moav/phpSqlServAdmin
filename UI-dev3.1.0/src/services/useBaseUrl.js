import useCurrents from "./useCurrents";

/**
 * Generate a baseUrl according to required depth (server/database/schema/table)
 * @param {string} depth 
 * @param {string} relPath 
 * @returns 
 */
export default function useBaseUrl(){
    const currents = useCurrents();

    return function(depth){
        if(!currents[depth]){
            throw new Error(`[${depth}] has no matching value to generate url`);
        }
        let baseUrl =`/server/${currents.server}`;
        if(depth === 'server'){
            return baseUrl;
        }

        baseUrl = `${baseUrl}/database/${currents.database}`;
        if(depth === 'database'){
            return baseUrl;
        }

        baseUrl = `${baseUrl}/schema/${currents.schema}`;
        if(depth === 'schema'){
            return baseUrl;
        }

        baseUrl =`${baseUrl}/table/${currents.table}`;
        return baseUrl;
    }
}
