<?php

function app_env()
{
    $ret = [
        'is_prod' => false,
        'log' => [
            'name' => 'VULCAN_',
            'handler' => 'File', // 'Errors_Monitor_FileEmailModulUser',//'Errors_Monitor_Syslog',//ColoredFile'//'Stdio',//'Nan'
            'verbosity' => 2,
            'uri' => '/var/log/vulcan/',
            'low_memory_footprint' => false
        ],

        'paths' => [
            'root_path' => '/home/itay/dev-repositories/vulcan/core',
            'domain' => '192.168.12.29',
            'root_uri' => '/vulcan'
        ],
        'mail' => [
            'host' => '127.0.0.1',
            'default_from' => 'avvp-schedule@medstar.net',
            'default_from_name' => 'Medstar Health',
            'username' => '',
            'password' => ''
        ],

        'database' => [
            'mysql_master' => [
                'host' => '127.0.0.1',
                'database' => 'vulcan_app',
                'username' => 'root',
                'password' => 'ItayMoav007!!',
                'verbosity' => 2
            ],
            'redis' => [
                'host' => 'localhost',
                'verbosity' => 2 // 0 - no out put; 1- shows the query 2- shows the query + results
            ]
        ],
        'external sources' => [
            'IDX' => [
                'user' => 'covid-vaccine-test',
                'pass' => '_5C(}/&Gz)fnK)6-eE9dzAJF\'n?p$B',
                'endpoint' => 'https://hieweb-test.medstar.net:8144'
            ]
        ]
    ];

    return $ret;
}