php -S localhost:8000 main_router.php &
echo "Spinneup localhost:8000/vulcan"


echo "*****************************************************************************************"
echo "* VULCAN STARTED                                                                        *"
echo "*                                                                                       *"
echo "* Spinneup localhost:8000/vulcan                                                        *"
echo "*                                                                                       *"
echo "* log folder: /var/log/vulcan                                                           *"
echo "*                                                                                       *"
echo "* PID  `ps -ef | grep "php -S localhost" | tr -s ' ' | cut -d ' ' -f3 | sed -n '1p'`                                                                            *"
echo "*****************************************************************************************"

open http://localhost:8000/vulcan
