<?php namespace model\Query\Command;

/**
 * Handles just deletes
 * 
 * @author itay
 * @date 2021-04-06
 */
class Delete extends \lib\Database\ChainWithConnection
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
            'rows deleted' => $run->numRows
        ]];
        return $this;
    }
}