/**********************************
  Starts Cronos Server in debug mode
   **********************************/

require('./print-cronos-banner').then(() => {
  let CommandHost = require('./CommandHost');

  let commands = [{
    disabled: false,
    title: 'Run UI',
    command: 'ng serve -o',
    options: { cwd: './CronosUI/', stdio: 'inherit', detached: false }
  }, {
    disabled: false,
    command: 'nodemon',
    delay: 3000,
    arguments: [`./dist/dev/cronos.debug.js`],
    options: { stdio: 'inherit' }
  }, {
    disabled: false,
    title: 'Debug Watch Build',
    command: 'npx webpack',
    arguments: [`--config`, `./webpack.config.dev.js`],
  }, {
    disabled: false,
    title: 'Copy debug configuration',
    command: 'xcopy',
    arguments: ['.\\.env', '.\\dist\\dev\\.env*'],
  }, {
    disabled: false,
    title: 'Copy package.json',
    command: 'xcopy',
    arguments: ['.\\package.json', '.\\dist\\dev\\'],
  }, {
    disabled: true,
    title: 'Open browser',
    delay: 3000,
    command: `"C:\\Program Files\\Mozilla Firefox\\firefox.exe"`,
    arguments: [`localhost:3000`]
  }];

  let host = new CommandHost(commands);
  host.RunAll();
})