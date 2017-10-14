"use strict";

var SWP_CONFIG = {
    "environment": "development",
    "api": {
        path: "https://swapi.co/api"
    },
    "app": {
        "path": "http://localhost:3000"
    }
};

if (typeof module != 'undefined') module.exports = SWP_CONFIG;
