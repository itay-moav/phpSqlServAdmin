<?php namespace model\Import\CSV;

/**
 * @author Itay
 * @date 2020-06-15
 */
class Looper{
    
    public const CSV_DELIMITER__PIPE = '|',
                 CSV_DELIMITER__COMA = ',',
                 INSERT_RECORDS_BUFFER_SIZE = 100
    ;
    
    /**
     * 
     * @var string
     */
    private string $table_name;
    /**
     * @var string $CSV_DELIMITER
     */
    private string $CSV_DELIMITER;
    /**
     * @var string $file_name
     */
    private string $file_name;
    /**
     * @var string $path_file_name
     */
    private string $path_file_name;
    /**
     * The looper will start reading data at the row n# in this field (if it is 0, will start at the first row).
     * @var int $cnt_header_fields
     */
    private int $header_rows_cnt;
    /**
     * [idx => [validator1, validator2 ...]]
     * @var array<mixed>
     */
    private array $validators;
    /**
     * @var array<mixed>
     */
    private array $field_level_filters = [];
    /**
     * @var string
     */    
    private string $last_error_msg   = '';
    /**
     * @var array<int, string>
     */
    private array $file_schema;
    /**
     * 
     * @var \lib\Database\Connection
     */
    private \lib\Database\Connection $db_conn;

    /**
     * @param string $path_file_name
     * @param string $csv_delimiter
     * @param int $cnt_header_fields
     * @param array $file_schema field names and their order in the CSV
     */
    public function __construct(string $table_name,string $path_file_name,string $csv_delimiter,int $header_rows_cnt,array $file_schema,\lib\Database\Connection $db_conn){
        $parts = explode('/',$path_file_name);
        $filename_idx = count($parts)-1;
        $this->table_name     = $table_name;
        $this->file_name      = $parts[$filename_idx];
        $this->path_file_name = $path_file_name;
        $this->CSV_DELIMITER  = $csv_delimiter;
        $this->header_rows_cnt = $header_rows_cnt;
        $this->file_schema    = $file_schema;
        $this->db_conn        = $db_conn;

        $this->load_filters();
        $this->load_validators();
    }
    
    /**
     * [idx => [validator1, validator2 ...]]
     * @var array
     */
    private function load_validators() : void {
        $this->validators = [];
    }
    
    /**
     * 
     * @return \model\Import\CSV\Looper
     */
    private function load_filters(){
        return $this;
    }
    
    /**
     * Process handles one whole file.
     */
    public function process():void{
        dbgr('OPENING FILE',$this->path_file_name);
        $handle = fopen($this->path_file_name, "r");
        if($handle === false){
            throw new \Exception("Could not open [{$this->path_file_name}]");
        }
        
        //jump the headers
        if(fgetcsv($handle,0,$this->CSV_DELIMITER) === false){
            throw new \Exception("File [{$this->file_name}] is empty");
        }
        
        $record_counter = 0;
        $insert_records  = [];
        
        //passing the header sections
        for($i=0;$i<$this->header_rows_cnt;$i++){
            $header = fgetcsv($handle,0, $this->CSV_DELIMITER);
            info("HEADER\n");
            info($header);
        }
        
        while (($data = fgetcsv($handle,0, $this->CSV_DELIMITER)) !== false) {
            dbgr('RECORD',$data);
            $record = [];

            //FILTER
            foreach($this->file_schema as $idx=>$field){
                $temp_value = trim($data[$idx]);
                
                //TODO move to a filter if makes sense
                if($temp_value === ''){
                    $temp_value = null;
                }
                
                if(isset($this->field_level_filters[$field])){
                    foreach ($this->field_level_filters[$field] as $filter){
                        $temp_value = $filter->filter($temp_value);
                    }
                }
                $record[$field] = $temp_value;
            }
            
            //VALIDATE and INSERT
            if($this->validate($record)) {
                $insert_records[] = $record;
                $record_counter++;
                
                if($record_counter > self::INSERT_RECORDS_BUFFER_SIZE){
                    $this->handle_insert($insert_records);
                    $insert_records = [];
                    $record_counter = 0;
                }
            } else {
                $this->handle_error($record);
            }
        }
        
        //last insert
        if($insert_records){
            $this->handle_insert($insert_records);
        }
    }
    
    /**
     * 
     * @param array $record
     * @return boolean
     */
    private function validate(array $record) {
        foreach($this->validators as $indx => $field_validators) {
            foreach($field_validators as $validator) {
                if(!$validator->validate($record[$indx])) {
                    $this->last_error_msg = $validator->message();
                    return false;
                }
            }
        }
        
        return true;
    }

    /**
     *
     * @param array $insert_records
     */
    private function handle_insert(array $insert_records):void{
        info("\n\nINSERTING NOW\n--------------\n");
        $sql = "INSERT INTO {$this->table_name} (" . join(',',$this->file_schema) . ") VALUES";
        foreach($insert_records as $record){
            $sql .="\n(";
            foreach($record as $field_value){
                if(strtolower($field_value)=='null'){
                    $sql .= 'NULL,';
                } else {
                    $field_value = str_replace("'","''",$field_value);
                    $sql .= "'{$field_value}',";
                }
            }
            $sql .='xxx),';
        }
        $sql .='xxx';
        $sql = str_replace(',xxx','',$sql);
        info($sql);
        $this->db_conn->execute($sql);
    }
    
    /**
     * 
     * @param array $record
     */
    private function handle_error(array $record):void{
        
    }
}
