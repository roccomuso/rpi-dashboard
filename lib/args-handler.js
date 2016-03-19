var argv = require('yargs')
  .usage('Usage: rpi-dashboard -p [server-port]')
  .help('help')
  .alias('help', 'h')
  .option('port', {
        alias: 'p',
        demand: false,
        describe: 'HTTP Server Port.',
        type: 'string' // can't use number because of a PM2 bug: https://github.com/Unitech/pm2/issues/2022
    })
  .default('port', 80)
  .example('rpi-dashboard -p 8080', 'Start the dashboard server on the specified port')
  .epilogue('@Author: Rocco Musolino - github.com/roccomuso/iot-433mhz - @Copyright 2016')
  .argv;

console.log('CLI arguments:');
console.log(argv);

module.exports = argv;