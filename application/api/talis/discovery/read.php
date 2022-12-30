<?php namespace Api;
/**
 * Discovery will list ALL APIs possible.
 * MAKE SURE TO DISABLE ON PUBLIC SITES, Or put under log in only users
 * 
 * Test call http://localhost/emerald/talis/discovery/read/callerid/2
 *           ./lord_commander /talis/discovery/read/callerid/2 {}
 * 
 * @author Itay Moav
 * @Date  2020-06-25
 */
class TalisDiscoveryRead extends \Talis\Chain\aFilteredValidatedChainLink{

    /**
     * 
     * {@inheritDoc}
     * @see \Talis\Chain\aFilteredValidatedChainLink::get_next_bl()
     */
    protected function get_next_bl():array{
        return [
            [ScrapAPIs::class,[]],            
            [\Talis\Chain\DoneSuccessfull::class,[]]
        ];
    }
}

/**
 * Go over the folders and list the items
 * @author itay
 *
 */
class ScrapAPIs extends \Talis\Chain\aChainLink
{
    public function process(): \Talis\Chain\aChainLink
    {
        $apis = $this->getDirContents(__DIR__ . '/../..');
        $filtered_apis = [];
        foreach($apis as $api){
            if(strpos($api,'.php')){
                $filtered_apis[] = str_replace('.php','',explode('/../..',$api)[1]);
            }
        }
        
        $payload = new \stdClass;
        $payload->list = $filtered_apis;
        $this->Response->setPayload($payload);
        return $this;
    }
    
    /**
     * @param string $dir
     * @return array<int, string>
     */
    private function getDirContents(string $dir):array{
        $results = [];
        $scanned_dir = scandir($dir) ?: [];
        $files =  array_diff($scanned_dir, ['..', '.']);
        
        foreach($files as $value){
            dbgn($value);
            if(!is_dir("{$dir}/{$value}")){
                $results[] = "{$dir}/{$value}";
            } else {
                $results[] = "{$dir}/{$value}";
                $results = array_merge($results,$this->getDirContents("{$dir}/{$value}"));
            }
        }
        return $results;
    }
}
