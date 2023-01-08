# VULCAN the phpSqlServAdmin
Browser based tool to work with MICROSOFT SQL SERVER from a Linux machine  

NOTICE!
=======

1. This is a tool meant ONLY for development environments. There is no security measures what so ever. You have been warned.
2. It is working but is also under heavy development.  
3. If you wish to install it, feel free to drop me a message and I will be happy to help you install it. Until such time I will have an installation script.
4. This tool was tested connecting to an Azure SQL DATABASE instance only.
5. This tool requires PHP >=7.4 
6. I am not not responsible nor liable to any damage caused to you by this tool. This tool is for DEVELOPMENT purposes only. Never to be used in production.



INSTALL (not yet ready - ping me for help)
==========================================
```
<Directory "/var/www/vulcan/api">
    RewriteRule . index.php [L]
</Directory>
```

## The PHP config
![example php config](./docs/1_config.jpeg)

## Select which server you want to work on
![list of configured servers](./docs/2_select_server.png)

## Select the database you want to look at
![list of databases in selected server](./docs/3-select_database.png)

## Show list of schema and tables in each schema under selected database
![list of schema and tables](./docs/4_list_schema_and_tables.png)

## Browse the table data
![table data](./docs/5_browse_table.png)

## See the table structure (fields, indexes, constraints etc)
![table structure](./docs/6_table_structure.png)

## See the raw CREATE TABLE statement
![sql CREATE TABLE](./docs/7_table_create_sql.png)

## Use the Query Editor with various short cuts and helpers
![Query Editor](./docs/8_query_editor.png)

## Import SQL files into the current database
![import SQL file](./docs/9_import_sql_file.png)




(50% sized)