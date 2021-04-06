<?php namespace model\Query\Command;

/**
 * Handles just inserts
 * 
 * @author itay
 * @date 2021-04-05
 */
class Insert extends \lib\Database\ChainWithConnection
{
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $payload = $this->Response->getPayload();
        $run = $this->conn->execute($payload->query);
        $payload->queryResult = [[
            'last insert id'=> $run->lastInsertID,
            'rows inserted' => $run->numRows
        ]];
        return $this;
    }
}