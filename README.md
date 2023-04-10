# SAS

Web app Link : https://64341bcbdb504a252036d62e--extraordinary-queijadas-e6ab63.netlify.app/

To run the project on localhost

1. clone the repo
2. run npm i inside both backend and frontend folder
3. add the .env file in backend and paste your own MONGO_URL=<url>
4. inside frontend package.json, change the proxy to "http://localhost:5000"
5. inside frontend> src > api > axios, comment the render server url and uncomment the localhost:5000 line
NOTE You can also run the app without changing backend URL but if you want to change the backend code then change it to local host
