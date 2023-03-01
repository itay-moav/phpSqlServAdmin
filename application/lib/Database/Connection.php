<?php namespace lib\Database;

/**
 * 
 * @author itay
 * @date 2021-April
 */
class Connection implements iConnection{

    /**
     *
     * @var \ZimLogger\Streams\aLogStream
     */
    private \ZimLogger\Streams\aLogStream $Logger;

    /**
     * Native DB class.
     * Most likely PDO
     *
     * @var \PDO
     */
    private \PDO $NativeDB;

    /**
     * Last SQL which has been performed
     *
     * @var String
     */
    private string $lastSql = '';

    /**
     * Holds the last PDO Statment object
     *
     * @var \PDOStatement
     */
    private \PDOStatement $lastStatement;

    /**
     * Array of Parameters last used in the last SQL
     *
     * @var string[]
     */
    private array $lastBindParams = [];

    /**
     * Number of the rows returned or affected
     *
     * @var Int
     */
    public int $numRows = 0;

    /**
     * Number of fields in returned rowset
     *
     * @var Int
     */
    public int $numFields = 0;

    /**
     * Holds the last inserted ID
     *
     * @var string|false
     */
    public string|false $lastInsertID = '';

    /**
     * Wether to execute the query or not.
     * Good to get back the SQL only, for Pagers, for example.
     */
    private bool $noExecute = false;

    /**
     * Give a name to the connection so we can register/unregister in the factory
     * Helpfull for debugging all active connections
     */
    private string $connection_name = '';

    /**
     * last error code caught with no fail on error
     * When false, no error was caught
     *
     * @var integer
     */
    public int $lastErrorCode = -1;

    /**
     * Creating an instance
     * Although this is a type of sigleton, we are using a public modifier here, as we inherit the PDO class
     * which have a public constructor.
     * 
     * @param string $connection_name
     * @param array<string, string> $conf_data
     * @param \ZimLogger\Streams\aLogStream $Logger
     */
    public function __construct(string $connection_name, array $conf_data, \ZimLogger\Streams\aLogStream $Logger)
    {
        $this->Logger = $Logger;
        $this->connection_name = $connection_name;
        $dns = "sqlsrv:server = tcp:{$conf_data['server']},{$conf_data ['port']}";
        if(isset($conf_data [\ENVIRONMENT__DBCONNECTIONS__DATABASE])){
            $dns .= "; Database = {$conf_data [\ENVIRONMENT__DBCONNECTIONS__DATABASE]}";
        }
        $this->NativeDB = new \PDO($dns,"{$conf_data ['username']}", "{$conf_data ['password']}");
        $this->NativeDB->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $this->Logger->debug("Connect to [{$dns}]");
    }
   
    /**
     * @param string $sql
     * @param array<string,string> $params
     * @throws \PDOException
     * @return Connection
     */
    public function execute(string $sql, array $params = []): Connection
    {
        $this->Logger->info('-----------------------------------------',false);
        $this->Logger->info('EXECUTING SQL',false);
        $this->Logger->info($sql,false);
        $this->Logger->info('QUERY PARAMS:',false);
        $this->Logger->info($params,false);
        
        $this->lastSql = $sql;
        $this->lastBindParams = $params;
        $this->Logger->debug($this->getDebugInfo());
        if ($this->noExecute)
            return $this;

        $DB = $this->NativeDB;

        if ($params && (count($params) > 0)) {
            $this->lastStatement = $DB->prepare($sql);
            $query = $this->lastStatement->execute($params);
            $error = $this->lastStatement->errorInfo();
        } else {
            $query = $DB->query($sql);
            if($query) $this->lastStatement = $query;
            $error = $DB->errorInfo();
        }

        if ($error[0] != '0000' || !$query) {
            $this->Logger->fatal("Query failed [{$sql}]", false);
            $this->Logger->fatal($error, false);
            throw new \Exception(print_r($error,true));
        }

        $this->numFields = $this->lastStatement->columnCount();
        $this->numRows   = $this->lastStatement->rowCount();
        $this->lastInsertID = $this->NativeDB->lastInsertId();
        $this->Logger->info("NUMFIELDS: [{$this->numFields}]\nNUMROWS: [{$this->numRows}]",false);
        $this->Logger->info('-----------------------------------------',false);
        return $this;
    }

    /**
     * Returns the last statement Object
     *
     * @return \PDOStatement
     */
    public function getLastStatement(): \PDOStatement
    {
        return $this->lastStatement;
    }

    /**
     * Returns the last SQL
     *
     * @return String
     */
    public function getLastSql(): string
    {
        return $this->lastSql;
    }

    /**
     * Returns the last bind valye array
     *
     * @return string[]
     */
    public function getLastbindParams(): array
    {
        return $this->lastBindParams;
    }

    /**
     * Fetch the rowset based on the PDO Type (FETCH_ASSOC,...)
     *
     * @param integer $fetch_type
     * @return array<string, string>
     */
    public function fetchAll(int $fetch_type = \PDO::FETCH_ASSOC): array
    {
        $res = $this->lastStatement->fetchAll($fetch_type);
        if($res === false){
            throw new \Exception('Failed retrieving results - add logs to debug');
        }
        return $res;
        //Was before, should I use this?   return $res ?: [];
    }

    /**
     * Fetch the rowset based on the PDO Type (FETCH_OBJ)
     *
     * @return \stdClass[]
     */
    public function fetchAllObj(): array
    {
        return $this->fetchAll(\PDO::FETCH_OBJ);
        /*TOBEDELETED
        $res = $this->lastStatement->fetchAll(\PDO::FETCH_OBJ);
        if($res === false){
            throw new \Exception('Failed retrieving results - add logs to debug');
        }
        return $res;
        */
    }

    /**
     * 
     * @param string $class_name
     * @param array<mixed> $ctor_args
     * @throws \Exception
     * @return \stdClass[]
     */
    public function fetchAllUserObj(string $class_name, array $ctor_args = []): array
    {
        $res = $this->lastStatement->fetchAll(\PDO::FETCH_CLASS, $class_name, $ctor_args);
        if($res === false){
            throw new \Exception('Failed retrieving results - add logs to debug');
        }
        return $res;
    }

    /**
     * 
     * @param callable $func
     * @return array<int,mixed>
     */
    public function fetchAllUserFunc($func): array
    {
        $res = $this->lastStatement->fetchAll(\PDO::FETCH_FUNC, $func);
        if($res === false){
            throw new \Exception('Failed retrieving results - add logs to debug');
        }
        return $res;
    }

    /**
     * returns the result index by the first selected field and an array of the
     * rest of the columns
     *
     * @param callable $func
     * @return array<int,mixed>
     */
    public function fetchAllIndexed(callable $func): array
    { // THIS IS STILL THOUGHT UPON!
        $res=$this->lastStatement->fetchAll(\PDO::FETCH_UNIQUE | \PDO::FETCH_FUNC, $func);
        if($res === false){
            throw new \Exception('Failed retrieving results - add logs to debug');
        }
        return $res;
    }

    /**
     * Returns array structured [f1=>f2,f1=>f2,f1=>f2 ...
     * f1=>f2]
     *
     * @return array<string,string>
     */
    public function fetchAllPaired(): array
    {
        $res =$this->lastStatement->fetchAll(\PDO::FETCH_KEY_PAIR);
        if($res === false){
            throw new \Exception('Failed retrieving results fetchAllPaired - add logs to debug');
        }
        return $res;
    }

    /**
     * Fetches one column as an array
     *
     * @param int $column
     *            index in select list
     * @return string[]
     */
    public function fetchAllColumn(int $column = 0): array
    {
        $res = $this->lastStatement->fetchAll(\PDO::FETCH_COLUMN, $column);
        if($res === false){
            throw new \Exception('Failed retrieving results fetchAllColumn - add logs to debug');
        }
        return $res;
        
    }

    /**
     * @param int $result_type
     * @return array<mixed>|\stdClass
     */
    private function fetchRow($result_type)
    {
        $res = $this->lastStatement->fetch($result_type);
        if($res === false){
            throw new \Exception('Failed retrieving results fetchRow - add logs to debug');
        }
        return $res;
    }

    /**
     * @return string[]
     */
    public function fetchNumericArray(): array
    {
        return $this->fetchRow(\PDO::FETCH_NUM);// @phpstan-ignore-line
    }

    /**
     * @return array<string,string>
     */
    public function fetchArray(): array
    {
        return $this->fetchRow(\PDO::FETCH_ASSOC);// @phpstan-ignore-line
    }

    /**
     * @return \stdClass
     */
    public function fetchObj():\stdClass
    {
        return $this->fetchRow(\PDO::FETCH_OBJ);// @phpstan-ignore-line
    }

    /**
     * Debug info for who ever wants it
     *
     * @return string
     */
    public function getDebugInfo(): string
    {
        return "LAST SQL: \n{$this->lastSql}\nWith params:\n\n" . print_r($this->lastBindParams, true);
    }
}
