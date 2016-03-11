# rpi-dashboard
## Basic Raspberry Pi Node.js Dashboard


<h3>Usage</h3>

Install globally:

    npm install -g rpi-dashboard

Then to execute:

    rpi-dashboard -p 8000

<code>--port</code> is not mandatory, default value is port 80.

Our advice is to use a process manager (like PM2):

    sudo pm2 start rpi-dashboard --name="rpi-dashboard" -- -p 8000

<h3>Clone the repo</h3>

In the first lines of <code>index.js</code> you'll find default values, like template directory and server port.

        var SERVER_PORT = 80;
        var TEMPLATE_DIR = __dirname+'/templates/';

- Clone the repository on the <code>/home/pi/Desktop/</code>:

        git clone https://roccomuso@github.com/roccomuso/rpi-dashboard.git

Then <code>cd rpi-dashboard</code> and <code>npm install</code>.

And to run the server on start up:
- Launch from CLI <code>crontab -e</code> and add the following line:

        @reboot /usr/local/bin/node /home/pi/Desktop/rpi-dashboard/index.js >/tmp/node_output 2>/tmp/node_error

(General console.log and error messages are respectively in <code>/tmp/node_output</code> and <code>/tmp/node_error</code>)


- Templating system used: Mustache.js. Every template is in the <code>/templates</code> directory by default.


#### Author: Rocco Musolino - hackerstribe.com
