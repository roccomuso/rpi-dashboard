# rpi-dashboard
Basic Raspberry Pi Node.js Dashboard



To execute the server at startup:
- Clone the repository on the <code>/home/pi/Desktop/</code>:

        git clone https://roccomuso@github.com/roccomuso/rpi-dashboard.git
- Launch from CLI <code>crontab -e</code> and add the following line:

        @reboot /usr/local/bin/node /home/pi/Desktop/rpi-dashboard/index.js >/tmp/node_output 2>/tmp/node_error

(General console.log and error messages are respectively in <code>/tmp/node_output</code> and <code>/tmp/node_error</code>)

- Templating system used: Mustache.js. Every template is in the <code>/templates</code> directory.


# Author: Rocco Musolino - hackerstribe.com
