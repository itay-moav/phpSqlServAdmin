#!/bin/php
<?php
/**
 * $argv[1] = table
 * $argv[2] = path/to/file
 * $argv[3] = How many rows are considered headers and should be ignored (int)
 * $argv[4] = delimiter in ""    for example: "," or  "|" defaults to ","
 * 
 * 
 * an example call ./import_csv.php users_table /home/me/Document/many_users.csv "," 1
 */
require_once __DIR__ . '/../config/bootstrap.php';

\ZimLogger\MainZim::setGlobalLogger(
    "VULCAN_IMPORT_CSV_{$argv[1]}",
    'Stdio',
    3,
    app_env()['log']['uri'],
    app_env()['log']['low_memory_footprint']
);

$api = "/importfile/csv/create/table/{$argv[1]}";
$body = new \stdClass;
$body->file            = $argv[2];
$body->header_rows_cnt = $argv[3];
$body->delimiter       = $argv[4] ?? ',';

info("\nSTARTING IMPORT\n------------------------\n\nINPUT:\n");
info($body);
info("\n------------------------\n");
(new \Talis\Doors\CliEmbeded)->gogogo($api,$body);