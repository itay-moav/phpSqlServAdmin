<?php namespace model\Query\Command;

/**
 * Create table Create View etc
 * 
 * @author itay
 * @date 2021-04-12
 */
class Create extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        $this->conn->execute($payload->query);
        $payload->triggerRefresh = 1;
        
        if(stripos($payload->query, 'table')){
            $part1 = explode(' ',$payload->query)[2];
            $schema_table = trim(explode('(',$part1)[0]);
            if(strpos($schema_table,'.')){
                $schema_table = explode('.',$schema_table);
                $schema = $schema_table[0];
                $table  = $schema_table[1];
            }else{
                $schema = 'dbo';
                $table  = $schema_table;
            }
            $nav_to = str_replace(['[',']'],'', "./../schema/{$schema}/tables/{$table}/structure");
            $payload->triggerNav = $nav_to;
        }
        return $this;
    }
}
