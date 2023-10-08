<?php namespace model\Query;

/**
 * A simple storage of a list of all predefined queries.
 * Abstracts soome actions from the UI, I do not want SQL in the UI
 * 
 * @author itay
 *
 */
class PredefinedQueries extends \Talis\Chain\aChainLink{
        
    /**
     * {@inheritDoc}
     * @see \Talis\Chain\aChainLink::process()
     */
    public function process(): \Talis\Chain\aChainLink
    {
        $method_name = 'query' . $this->Request->get_param_exists('queryName');
        $this->$method_name();
        return $this;
    }
    
    
}