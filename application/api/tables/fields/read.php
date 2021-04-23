<?php namespace Api;
class TablesFieldsRead extends \Talis\Chain\aFilteredValidatedChainLink{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [\lib\Database\FindConnectionName(),[]],
            [FetchAllFields::class,[]],
            [\model\Query\Run::class,[]],
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}




class FetchAllFields  extends \Talis\Chain\aChainLink{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $table = $this->Request->get_param_or_fail('table');
        $query = "exec sp_columns [{$table}]";
        $this->Request->addToBodyParams ('query',$query);
        return $this;
    }
}