# Cronos
Boiler plate code for a NodeJS Application with Angular front end

## Setup
`npm run start` - start application in debug mode (webpack watches the server's sourcecode (typescript), nodemon watches the output of webpack (server is automatically restarted when it's TS sourcecode changes) and angular live dev server is run) 

`npm run release` - sets up ./dist/release folder for releasing, webpack does production build into it, angular production builds to it (inside makes a folder 'public')

## P.S
Easy to add new commands to start, release scripts, or to create new scripts. 