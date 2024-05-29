<?php namespace Api;
/**
 * 
 * Runs a pre defined query with 0 or many params
 * The pre defined query are under model/query/predefined
 * 
 * @author itay
 *
 */
class QueryPredefinedCreate extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     *
     * @var array<int, array<int, array<string, string>|class-string>>
     */
    protected array $dependencies  = [
        [\Talis\Chain\Dependencies\GetFieldExist::class,['field'=>'queryName']]
    ];
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [\model\Query\PredefinedQueries::class,[]],
            [\model\Query\Run::class,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
