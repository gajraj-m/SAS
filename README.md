# SAS

Web app Link : https://6434b6551670f14a3f33a41a--extraordinary-queijadas-e6ab63.netlify.app/

login as admin first to see all the employee details -> 
* username - admin
* password - 12345

Only Admin can add employees. ALready created employees have password : 12345

To run the project on localhost

1. clone the repo
2. run npm i inside both backend and frontend folder
3. add the .env file in backend and paste your own MONGO_URL=<url>
4. inside frontend> src > api > axios, comment the "render" server url and uncomment the "localhost:5000" line
  
NOTE You can also run the app without changing backend URL but if you want to change the backend code and see changes then update it to local host
