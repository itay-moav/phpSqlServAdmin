<?php namespace lib\Database;

/**
 * 
 * @author itay
 * @date 2021-April
 */
interface iConnection{


    /**
     * Creating an instance
     * Although this is a type of sigleton, we are using a public modifier here, as we inherit the PDO class
     * which have a public constructor.
     * 
     * @param string $connection_name
     * @param array<string, string> $conf_data
     * @param \Talis\commons\iLogger $Logger
     */
    public function __construct(string $connection_name, array $conf_data, \Talis\commons\iLogger $Logger);
    
    /**
     * @param string $sql
     * @param array<string,string> $params
     * @throws \PDOException
     * @return Connection
     */
    public function execute(string $sql, array $params = []): iConnection;
    
    /**
     * Fetch the rowset based on the PDO Type (FETCH_ASSOC,...)
     *
     * @param integer $fetch_type
     * @return array<string, string>
     */
    public function fetchAll(int $fetch_type = \PDO::FETCH_ASSOC): array;
}
