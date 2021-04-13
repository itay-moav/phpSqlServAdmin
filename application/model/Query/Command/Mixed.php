<?php namespace model\Query\Command;

/**
 * Any currently un handled queries and multiple queries
 * 
 * @author itay
 * @date 2021-04-12
 */
class Mixed extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        dbgn('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
        $payload = $this->Response->getPayload();
        //handle multiple queries with the "GO" delimiter
        $query = str_replace("GO\n",";\n",$payload->query);
        
        try{
            $run = $this->conn->execute($query);
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
        dbgr('QUERY',$query);
        dbgr("stripos($query,'CREATE')",stripos($query,'CREATE'));
        dbgr("stripos($query,'ALTER')",stripos($query,'ALTER'));
        dbgr("stripos($query,'DROP')",stripos($query,'DROP'));
        dbgn('ggggggggggggggggggggggggggggggggggggggggg');
        if(stripos($query,'ALTER') !== false || stripos($query,'DROP') !== false || stripos($query,'CREATE') !== false ){
            $payload->triggerReferesh = 1;
        }
        
        return $this;
    }
}
