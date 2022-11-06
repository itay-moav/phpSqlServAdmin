<?php namespace model\Query\Command;

/**
 * Any currently un handled queries and multiple queries
 * 
 * @author itay
 * @date 2021-04-12
 */
class MixedQuery extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        //handle multiple queries with the "GO" delimiter
        $query = str_replace("GO\n",";\n",$payload->query);
        $run = $this->conn->execute($query);//error handled in Run.php

        try{
            $possible_res = $run->fetchAll();
        } catch(\PDOException $e){
            if($e->getCode() !== \model\Query\ERROR_CODE__NO_RESULTS){
                throw $e;
            } else {
                $possible_res = false;
            }
        }
        
        //reuslts
        if($possible_res){
            $payload->queryResult = $possible_res;
            
        } elseif ($run->numRows > 0){
            $payload->queryResult = [[
                'rows updated'    => $run->numRows
            ]];
        } 
        
        //Do we have some schema altering code?
        if(stripos($query,'ALTER') !== false || stripos($query,'DROP') !== false || stripos($query,'CREATE') !== false ){
            $payload->triggerRefresh = 1;
        }
        
        return $this;
    }
}
