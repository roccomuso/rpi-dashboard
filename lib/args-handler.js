var argv = require('yargs')
  .usage('Usage: rpi-dashboard -p [server-port]')
  .help('help')
  .alias('help', 'h')
  .option('port', {
        alias: 'p',
        demand: false,
        describe: 'HTTP Server Port.',
        type: 'number'
    })
  .default('port', 80)
  .example('rpi-dashboard -p 8080', 'Start the dashboard server on the specified port')
  .epilogue('@Author: Rocco Musolino - github.com/roccomuso/iot-433mhz - @Copyright 2016')
  .argv;

//console.log(argv);

module.exports = argv;