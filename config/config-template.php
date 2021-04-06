<?php
/**
 * 
 * @return array<string, array<string, array<string, int|string>|bool|int|string>>
 */
function app_env():array
{
    $ret = [
        'log' => [
            'name' => 'VULCAN_PHPSQLSERVADMIN_',
            'handler' => 'File', //ColoredFile'//'Stdio',//'Nan'
            'verbosity' => 4,
            'uri' => '/var/log/vulcan/',
            'low_memory_footprint' => false
        ],
        
        'paths' => [
            'domain' => 'localhost',
            'root_uri' => '/vulcan/api' //this means you browse to localhost/vulcan/frontend or, under dev conditions localhost:3000/index.html
        ],
        
        'databases' => [
            'my_db_name' => [
                'connection_name'   => 'I prefer my_db_name as the db name',
                'server'            => 'server doman server.domain.com',
                'database'          => 'database_name',
                'port'              => 1433,//check, this is the default for Azure
                'username'          => 'your admin username',
                'password'          => 'Your very secret password, remember this is for dev purposes only!'
            ]
        ]
    ];
    
    return $ret;
}

