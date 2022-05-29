# hotel-management-system

## Requirements

React Version: version 17 <br>
Node Version: 16.x <br>
NPM Version: 6.14.13 or higher <br>
MySQL Version: 8.0.x <br>

## Installing Dependencies

The system is built on Node server, React app and MySQL database, therefore these 3 main foremost tools need to be installed with specified version.

### Installing Node.js

Node run time environment is used to run the back-end server of the system and handle the HTTP request. Go to https://nodejs.org/en/download/ URL and download the specified Node.js installer suitable for you operating system and install it. When you install Node, it automatically installs NPM (Node Package Manager). If you want to install packages and dependencies using yarn, you are free to do that, but we recommend using NPM.
To check the installation, go to the terminal and type node --version or node -v to check the version of the node environment installed and type npm --version or npm -v to check the packages manager version. If the NPM version is 5.2.0 or higher you are finished with Node.js installation but if you have installed an older version run npm install -g npm to install NPX (Node Package Executor) globally.

### Installing React

React is basically not a tool but a library, therefore we don’t have to install a separate tool for to run react on the browser. If you have installed NPM version 5.2.0 or higher you can run the node executor directly from the terminal.

### Installing MySQL

Go to https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/ and install MySQL database which is compatible to you operating system. After installation open a terminal and type mysql --version to check the successful completion of the installation.

### Installing PM2

PM2 helps to automatically restart the server even if some error or some changes happens in the server. To install PM2 globally open the terminal and type npm install pm2 -g (or yarn global add PM2, if you are using yarn package manager). Visit https://pm2.keymetrics.io/docs/usage/quick-start/ if you need more information.

This is not mandatory but if you have installed PM2 globally then you can check the backend server status using different PM2 commands provided in the above PM2 website link.


## Compiling

Project files are included. If the included files are corrupted or not working as expected go the GitHub repository (https://github.com/KabilanMA/hotel-management-system) of the project and download the current version. Download the files in the local directory and go to the /backend directory and check if it contains package.json and package-lock.json files are included. Open a terminal and go to /backend directory location and run npm install to install dependencies and libraries for the server side. Next go to /frontend directory and run npm install to install dependencies and libraries for the front-end development.
If any error arises when compiling, the program might not be able to work properly as expected. In that case, please recheck all installations with the specified version. If the problem persists, create an issue to the git repository. We will try to solve the issue in 24 hours.

## Program Execution

1.	After Compiling, open the terminal and go to /backend directory and type “npm start” to run the backend server in the localhost. If the server starts successfully, it will print a table with server details. (To stop the running backend server type “npm stop” inside the /backend directory in the terminal)
2.	In the terminal, go to /frontend directory and type “npm start” to open the program in your default browser. If it successfully starts the program, we are good to go. Don’t close this terminal. This terminal is hosting the program, therefore closing this terminal end the program life.

•	Terminal must be running throughout the process. If the terminal crashes for any reason restart the terminal again by typing ctrl+c and “npm start”.

•	If the server takes too long to respond or some undesired error occurs, close the running server in the terminal using ctrl+c, and go to /backend directory and type “npm restart” to rerun the backend server. Then go to /frontend directory and type “npm start” to start the program again.
		
		
		
		



