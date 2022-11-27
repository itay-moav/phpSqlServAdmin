<?php namespace Api;
/**
 * 
 * @author itay
 *
 */
class QueryRunCreate extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\Run::class,[]],
            
            //ON HOLD https://stackoverflow.com/questions/74423340/catch-sqlsrv-execution-plan-with-php   
            //[\model\Query\PreRunAnalyzer::class,[]],
            
            
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
