<?php namespace model\Import\CSV;

/**
 * Init the CSV looper, The connection, get table structure, run the batches of queries
 * @author itay
 * @date 2021-04-08
 */
class Main extends \lib\Database\ChainWithConnection{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process():\Talis\Chain\aChainLink{
        $payload = $this->Response->getPayload();
        dbgr('FIELDS',$payload->queryResult);
        $file_schema = [];
        foreach($payload->queryResult as $a_field){
            $file_schema[] = $a_field['COLUMN_NAME'];
        }
        
        $Looper = new Looper($this->Request->get_param_exists('table'), $this->Request->getBody()->file, $this->Request->getBody()->delimiter, $this->Request->getBody()->header_rows_cnt, $file_schema,$this->conn);
        $Looper->process();
        
        return $this;
    }
    
}