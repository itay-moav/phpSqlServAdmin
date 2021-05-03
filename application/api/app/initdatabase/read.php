<?php namespace Api;

/**
 * Fetch init data for the dabases selected
 * 
 * @author itay
 *
 */
class AppInitdatabaseRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\Run::class,['query' => 'EXEC sp_tables']], //fetches all tables in db
            
            //Sorts the possible table owners in an easy to use array
            [function (\Talis\Message\Request $Request,\Talis\Message\Response $Response){
                
                $payload = $this->Response->getPayload();
                $table_owners = [];
                foreach($payload->queryResult as $table){
                    $table_owners[$table['TABLE_OWNER']] = $table['TABLE_OWNER'];
                }
                $payload->tablesOwners = array_values($table_owners);
            }
                                                ,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
