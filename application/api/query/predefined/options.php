<?php namespace Api;
/**
 * @author Itay Moav
 */
class QueryPredefinedOptions extends \Talis\Chain\OptionsAllowed{
    
    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\OptionsAllowed::allowed()
     */
    protected function allowed():string{
        return 'OPTIONS, POST';
    }
}
