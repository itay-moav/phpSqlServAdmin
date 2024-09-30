V3.0.0 (closed on 20240528)
======
- Create the predefined queries store and APIs [V see truncate table/empty table operation as a working example]
- Create a standalone app launch on top of php -S [V See install script under /standalon and then go to localhost:8000/vulcan]
- Enable deep links :[V  This was implemented on the rood index.js by analyzing the url. Normal browsing the url there will be just vulcan/ if it is anything else (see code for exact rule)
  It will assume a deep link or browser refresh was done. It will trigger a series of thunk dispatches to load the current db data in order and in sync way].
- Migrate to use VITE
- Bump npm dependencies  

V3.1.0 (started on: 20240528,closed on: )
======






TODOs
=====
- FIX bug ON FIRST CREATION! (possibly on multiple sentences sql) on url http://localhost:3000/vulcan/servers/127.0.0.1/databases/stargates/schema/stellar_bodies/tables/galaxies/structure
- table operation page  
- Paged query results  + total number of records in dataset
- Abstract colors and various Atoms
- sqldump facility
- Qucik dump facility - dumps current resultset (full or just current page) with or without table schema
- add sort on columns
- add views and triggers to side menu
- fix react erros on build 
- fix composer issues
- fix static analysis issues
- fix bug when running insert with this error (multiple sentence) I do not hget an alert
SQLSTATE[23000]: [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Cannot insert explicit value for identity column in table 'constellations' when IDENTITY_INSERT is set to OFF.
- implement a way to norify users when system setup is lacking.
-- log folder is not accessible or no existing
-- sql server is not accessible
- Bump composer dependencies
- fix bug in standalone mode : use the proper open command for linux. Use some logic to figure out how to open vulcan url
- handle TOBEDELETED
- in the tables / insert page. Make the identitity(1,129) reflect the actual number that should be there
