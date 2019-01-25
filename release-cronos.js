/***************************
  Release build Cronos Server
   ***************************/

require('./print-cronos-banner').then(() => {
  let CommandHost = require('./CommandHost');
  let commands = [{
    title: 'Clean directory for release',
    command: 'rmdir',
    arguments: ['dist', '/s', '/q'],
  }, {
    title: 'Copy production configuration',
    startafter: 'Production build',
    command: 'copy',
    arguments: ['prod.env', '"dist/release/.env"'],
  }, {
    title: 'Copy package.json',
    startafter: 'Production build',
    command: 'copy',
    arguments: ['package.json', '"dist/release/"'],
  }, {
    title: 'Production build',
    command: 'npx webpack',
    arguments: [`--config`, `./webpack.config.release.js`],
  },{
    title: 'Run Angular Production Build',
    command: 'ng build',
    arguments: [`--prod`, `--baseHref=/`],
    options: { cwd: './CronosUI', stdio: 'pipe' }
  }, {
    title: 'Bind UI',
    startafter: 'Run Angular Production Build',
    command: 'xcopy',
    arguments: ['.\\CronosUI\\dist\\CronosUI\\*', '.\\dist\\release\\public\\*']  ,options: { stdio: 'pipe' }
  }];

  let host = new CommandHost(commands);
  host.RunAll();
})