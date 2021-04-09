<?php namespace Api;
require_once('create.php');
class ImportfileCsvRead extends \Talis\Chain\aFilteredValidatedChainLink{
    /**
     * @var  array<int, array<int, array<string, string>|class-string>>
     */
    protected array $dependencies  = [
        [\Talis\Chain\Dependencies\GetFieldExist::class,['field'=>'table']],
    ];
    
    /**
     *
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
                [function (\Talis\Message\Request $Request){
                    
                    $table = $Request->get_param_exists('table');
                    $Request->addToBodyParams('query',"exec sp_columns [{$table}]");
                }
                                                        ,[]],
                [\model\Query\Run::class                ,[]],
                [\model\Import\CSV\Main::class          ,[]],
                [\Talis\Chain\ResourceCreated::class    ,[]]
       ];
    }
}
