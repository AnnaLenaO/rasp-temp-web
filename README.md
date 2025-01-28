# rasp-temp-web

Use Raspberry pi to transfer value from digital temperature sensor to webb application on local Wi-Fi network.

# Components

Raspberry Pi 5 8GB RAM, 27W USB-C Poer Supply & Case with integrated cooling fan.\
ScanDisk Ultra microSDXC UHS-I Card 128 GB, speed up to 140 MB/s.\
Luxorparts 20 CM Male-Female Dupont Cable.\
PLAYKNOWLOGY resistor 4.7 kΩ.\
Suitable accesories to connect the components.

# Rules for code, not files

Single quotes.\
4-space indentation for code.\
Naming with full words and no abrevations.\
React component & Express class names with PascalCasing, otherwise camelCase.\
React constant & Express environmental variable names with UPPER_SNAKE_CASE.\
Higher-Order Components in React with prefix "with".\
Even-Handler functions in React with prefix "handle" & PascalCase.

# Rules for structure

One React component per file.

# Rules for issue & pull request

Separate branch for each issue.\
Each pull request needs one approving review before merge into main.\
Not suitable for only one teammember
Before every pull request:

- git checkout branch-name
- git pull origin main
- resolve merge conflicts and then\
  git add .
- git commit -m "Your commit message for merging main into branch-name"
- git push origin branch-name

# Clone repository & connect with Raspberry Pi

Connect the physical components mentioned above\
Google it or follow instructions at\
https://www.raspberrypi.com
for how to connect the components to the Raspberry Pi GPIO\
Prepare the Raspberry Pi 5 & install recommended Operating System according to:\
https://www.raspberrypi.com/documentation/computers/getting-started.html#setting-up-your-raspberry-pi

Clone this repository

Check your local network for the Raspberry Pi Ip-adress

Prepare Raspberry Pi according to the ServerRPi\README.md\
Connect with Raspberry Pi & start the server, for example from commando prompt with:\
-node index.js

For the clone, go to backend folder & add a .env-folder with following content:\

`BACK_HOST=localhost
BACK_PORT=5080
RPI_HOST=<Raspberry-Pi-IP-adress>
RPI_PORT=3000`

then run:\
-npm install\
-npm start

Go to frontend & run:\
-npm install\
-npm run dev

Open a webb client & connect to the app by pasting the http- adress shown by VITE in the terminal,
for example\ http://localhost:5173

The temperature & timestamp are now visible at the web page.\
Reload the page for a new measurement of temperature with updated timestamp.

# Clone repository & test without Raspberry Pi 5

Clone this repository

Go to backend folder & add a .env-folder with following content:

`BACK_HOST=localhost
BACK_PORT=5080`

In the backend\src\index.ts\
out comment the whole function

`function fetchPondData(...): any{}`

and exchange

`app.get('/pond-data', fetchPondData, (req: ExtendedRequest, res: Response) => {
    res.json(req.pondData);
});`

with

`app.get('/pond-data', (req: ExtendedRequest, res: Response) => {
    res.json({
        temperature: `${23}°C`,
        timestamp: new Date(0).toISOString(),
    });
});`

Save the changes\
then run:\
-npm install\
-npm start

Go to frontend & run:\
-npm install\
-npm run dev

Open a webb client & connect to the app by pasting the http- adress shown by VITE in the terminal,
for example\ http://localhost:5173

The temperature & timestamp are now visible at the web page.\
Change the temperature value 23
in

`temperature: `${23}°C``

at the backend server with a new value\
Save the change and restart the backend server\

Reload the page for the new temperature to appear
