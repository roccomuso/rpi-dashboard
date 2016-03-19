#!/usr/bin/env node

/*
*	RPi Dashboard - Execute at startup: 'crontab -e' and add the following line:
*	@reboot /usr/local/bin/node /home/pi/Desktop/rpi-dashboard/index.js >/tmp/node_output 2>/tmp/node_error
*
*	Author # Rocco Musolino - hackerstribe.com
*/

var exec = require('child_process').exec;
var fs = require('fs');
var async = require('async');
var Mustache = require('mustache'); // Mustache js
var express = require('express');
var app = express();
var argv = require('./lib/args-handler.js'); // yargs (get CLI arguments)

function execute(command, callback){ // Execute CLI cmds
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

var SERVER_PORT = argv.port.trim(); // PM2 bug: https://github.com/Unitech/pm2/issues/2022
var TEMPLATE_DIR = __dirname+'/templates/';
var HOME_TEMPLATE = "home.mustache";
var INFO_TEMPLATE = "info.mustache";

if (isNaN(SERVER_PORT)) throw Error('SERVER_PORT not a number');

// ENTRY POINTS:

app.get('/', function (req, res){
	fs.readFile(TEMPLATE_DIR+HOME_TEMPLATE, function (err, template) {
	  if (err) throw err;
	  var obj_to_render = {welcome: "Welcome on the RPi Node.js Web Server."};
	  var output = Mustache.render(template.toString(), obj_to_render);
	  res.send(output); 
	});
});


app.get('/info', function (req, res) {
	fs.readFile(TEMPLATE_DIR+INFO_TEMPLATE, function (err, template) {
	  if (err) throw err;

	  // Executing functions in series...
		async.series({
		    date: function(callback){
				execute('date', function(data){
					callback(null, data);
				});
		    },
		    cpu: function(callback){
				execute('mpstat', function(data){
					if (data)
						callback(null, data);
					else
						callback(null, 'Make sure to have sysstat installed for mpstat command');
				});
		    },
		    ram: function(callback){
				execute('free -h', function(data){
					callback(null, data);
				});
		    },
		    uptime: function(callback){
				execute('uptime', function(data){
					callback(null, data);
				});
		    },
		    partitions: function(callback){
				execute('df -h', function(data){
					callback(null, data);
				});
		    },
		    temperature: function(callback){
				execute('/opt/vc/bin/vcgencmd measure_temp', function(data){
					callback(null, data);
				});
		    },
		    last_ssh: function(callback){
				execute('last -n 5', function(data){
					callback(null, data);
				});
		    },
		    usb: function(callback){
				execute('lsusb', function(data){
					callback(null, data);
				});
		    },
		    network: function(callback){
				execute('/sbin/ifconfig', function(data){ // executable not in default directory needs full path
					callback(null, data);
				});
		    },
		    wifi: function(callback){
		    	execute('iwlist wlan0 scan | grep ESSID', function(data){
		    		callback(null, data);
		    	});
		    }
		},
		function(err, obj_to_render) {
		    // obj_to_render is now equal to: {date: "....", cpu: "..."} etc.
		    if (err) res.send(err);
		    var output = Mustache.render(template.toString(), obj_to_render);
	  		res.send(output); 
		});

	});
  	
});


var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('RPi-dashboard listening at http://%s:%s', host, port);
});