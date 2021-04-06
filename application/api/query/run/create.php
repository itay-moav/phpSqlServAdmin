<?php namespace Api;
class QueryRunCreate extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\model\Query\Run::class,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}
