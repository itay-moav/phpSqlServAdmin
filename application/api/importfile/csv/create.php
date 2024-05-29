<?php namespace Api;
/**
 * 
 * @author itay
 *
 */
class ImportfileCsvCreate extends \Talis\Chain\aFilteredValidatedChainLink{
    /**
     * @var  array<int, array<int, array<string, string>|class-string>>
     */
    protected array $dependencies  = [
        [\Talis\Chain\Dependencies\GetFieldExist::class,['field'=>'table']],
        [\Talis\Chain\Dependencies\BodyFieldExist::class,['field'=>'file']]
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
            [\model\Query\Run::class,[]],
            [\model\Import\CSV\Main::class,[]],
            [\Talis\Chain\ResourceCreated::class,[]]
        ];
    }
}
