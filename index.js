const express     = require('express');
const app         = express();
const compression = require('compression');

const appConfig = require('./app-config');
const appPort = 3000;
 //
if (!appConfig) process.exit('star-wars-app failed to load. Missing app-config.js in root');
let appEnvironment = appConfig.environment || 'production';

app.use(
    compression()

).get('/app-config.js', (req, res) =>
    res.sendFile(`${__dirname}/app-config.js`)

).use('/bower_components',
    express.static(`${__dirname}/bower_components`)
);

// Development server settings
if (appEnvironment == 'development') {

    app.use('/static',
        express.static(`${__dirname}/src/modules`)

    )
    app.use('/media',
        express.static(`${__dirname}/media`)

    ).get('*', (req, res) =>
        res.sendFile(`${__dirname}/src/index.html`)
    );

// Production server settings
} else {

    app.use('/assets',
        express.static('./dist/assets')

    )
    .use('/media',
        express.static(`${__dirname}/media`)

    )
    .get('*', (req, res) =>
        res.sendFile(`${__dirname}/dist/index.html`)
    );
}

app.listen(appPort, () =>
    console.log(`star-wars-app - Server running in ${appEnvironment} mode on port ${appPort}`)
);
