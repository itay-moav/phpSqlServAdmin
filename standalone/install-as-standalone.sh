#TODO make dev folder a variable
cp ../UI-dev3.0/standalone.env.production ../UI-dev3.0/.env.production
cd ../UI-dev3.0
rm -fr build node_modules
npm run build
cd ..
rm -fr standalone/vulcan
mv UI-dev3.0/build standalone/vulcan
cd standalone
./kickbutt.sh
