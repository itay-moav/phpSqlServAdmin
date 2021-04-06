# steven_universe_emerald
base system to manage the Data Warehouse. Manages admin panel, data imports, data preparations.

system has production and staging on ATC  
System installed on /usr/local/steven_universe/emerald. When installed on local system, make this a ln -s to your dev env.    
System consists of the DB assests too.  
System depeneds on TalisMS. You can install from https://github.com/itay-moav/TalisMS.git to /usr/share/php/
UI is implemented in Aeonflux.  
ENVIRONMENT FILE is located at /etc/steven_universe and is checked out from steven_universe_environments

Bin folder is for backend processes / cli tools.
Doors folder is to handle requests from other apps/clients. For http, soft link /var/www/emerald to steven_universe_emerald/doors/http/
application/api is where we define the Actions (good idea to have one abstract action per folder, if all actions in folder share same dependencies/filters)  
application/model is where we implement business logic in a middleware way + auziliary helper classes, like IDUhubs  
application/lib is low level code/library, specific for this project (otherwise, consider putting it in TalisMS)  
application/aux is for auxiliary classes for specific data sources elements, like the IDUHubs  



# Installation (pls add as u find issues)
1. (recommended) create a folder outside Eclipse workspace called emerald.
2. Checkout out into emerald both steven_universe_environments and steven_universe_emerald
3. Create a project in eclipse called emerald, soft link into it both projects from above (names are env and app).
4. Create a softlink under /var/www called emerald, point it to the app/doors/http folder
5. Add the following in Apache config  
`
<Directory "/var/www/emerald">  
    # if a directory or a file exists, use it directly  
    #check if file/dir exists,  
    RewriteCond %{REQUEST_URI} !(crossdomain\.xml) [NC]  
    # otherwise forward it to index.php  
    RewriteRule . index.php [L]  
</Directory>  
`
and restart
6. create folder /etc/steven_universe
7. under that folder soft link to your environment environment.php => your environment
8. soft link the goolge key google.service.keyfile.940393023786-ibk2idcbd6svh374haivbba83qpaucrf.apps.googleusercontent.com -> /home/itay/clidev/steven_universe_environments/key_files/google.service.keyfile.940393023786-ibk2idcbd6svh374haivbba83qpaucrf.apps.googleusercontent.com
9. make sure to restore ALL of emerald's databases.
10. to test, u can go to browser and run http://localhost/emerald/errors/list/read/callerid/2/view/quick 
