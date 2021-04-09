<?php namespace model\Import\CSV;

/**
 * @author Itay
 * @date 2020-06-15
 */
abstract class aLooper{
    
    public const CSV_DELIMITER__PIPE = '|',
                 CSV_DELIMITER__COMA = ','
    ;
    /**
     * @var string $CSV_DELIMITER
     */
    protected string $CSV_DELIMITER;
    /**
     * @var string $file_name
     */
    protected string $file_name;
    /**
     * @var string $path_file_name
     */
    protected string $path_file_name;
    /**
     * The looper will start reading data at the row n# in this field (if it is 0, will start at the first row).
     * @var int $cnt_header_fields
     */
    protected int $cnt_header_fields;
    
    /**
     * [idx => [validator1, validator2 ...]]
     * @var array<mixed>
     */
    protected array $validators = [];
    /**
     * @var array<mixed>
     */
    protected array $field_level_filters = [];
    
    protected string $last_error_msg   = '';
    
    /**
     * @var array<int, string>
     */
    protected array $file_schema=[];
    
    /**
     * @param string $path_file_name
     * @param string $csv_delimiter
     * @param int $cnt_header_fields
     */
    public function __construct(string $path_file_name,string $csv_delimiter=self::CSV_DELIMITER__COMA,int $cnt_header_fields = 0){
        $parts = explode('/',$path_file_name);
        $filename_idx = count($parts)-1;
        $this->file_name = $parts[$filename_idx];
        $this->path_file_name = $path_file_name;
        $this->CSV_DELIMITER=$csv_delimiter;
        $this->cnt_header_fields = $cnt_header_fields;
        $this->load_filters();
        $this->loadValidators();
    }
    
    /**
     * [idx => [validator1, validator2 ...]]
     * @var array
     */
    protected function loadValidators() : void {
        $this->validators = [];
    }
    
    protected function load_filters(){
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
        while (($data = fgetcsv($handle,0, $this->CSV_DELIMITER)) !== false) {
            dbgr('RECORD',$data);
            $record = [];
            
            //TODO these filters might be added as a separate code
            if(!$this->cnt_header_fields && $record_counter >= $this->cnt_header_fields) {
                foreach($this->file_schema as $idx=>$field){
                    $record[$field] = trim(strtolower($data[$idx]));
                    if($record[$field] === ''){
                        $record[$field] = null;
                    }
                }
            }
            foreach ($this->field_level_filters as $feild_name =>$filters){
                foreach ($filters as $filter){
                    $record[$feild_name] = $filter->filter($record[$feild_name]);
                }
            }
            
            if($this->validate($record)) {
                $insert_records[] = $this->add_data_to_record($record);
                $record_counter++;
                
                if($record_counter>50){
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
    
    protected function add_data_to_record(array $record):array{
        return $record;
    }
    
    protected function validate(array $record) {
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
     */
    abstract protected function handle_insert(array $insert_records):void;
    
    abstract protected function handle_error(array $record):void;
}


