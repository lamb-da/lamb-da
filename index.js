const SheepyConstructor = require("./src/SheepyConstructor");
const SheepyOptionsValidator = require("./src/SheepyOptionsValidator");
const path = require("path");
const fs = require('fs')
const express = require("express");
const request = require("request-promise");

var app = express();

app.get("/sheepy", (req, res, done) => {
    handleRequest(res, req.query);
});

app.get("/basesheepys", (req, res, done) => {
    let srcpath = "./basesheepys";
    let folders = fs.readdirSync(path.resolve(srcpath)).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
    res.end(`["${folders.join('","')}"]`);
});

app.get("/sheepy/:basesheepy", (req, res, done) => {
    req.query.basesheepy = req.params.basesheepy;
    handleRequest(res, req.query);
});

function handleRequest(res, queryParams) {
    let validator = new SheepyOptionsValidator();
    
    let error = validator.validate(queryParams);
    if(!error) {
        constructSheepy(res, queryParams);
    } else {
        console.error(error);
        res.status(400).end(error);
    }
}

function constructSheepy(res, queryParams) {
    let fileName = "generatedsheepy.gif";
    res.writeHead(200, { "Content-Type":"image/gif" });

    let sheepyConstructor = new SheepyConstructor();
    var promises = [];
    if(queryParams.basesheepy) {
        sheepyConstructor.setBaseSheepy(queryParams.basesheepy);
    }

    sheepyConstructor.start(res, queryParams);

    if(queryParams.overlay) {
        var overlayPromise = sheepyConstructor.addFollowingOverlayImage(queryParams.overlay, 
                                                                        parseInt(queryParams.overlayOffsetX), 
                                                                        parseInt(queryParams.overlayOffsetY),
                                                                        queryParams.overlayWidth,
                                                                        queryParams.overlayHeight,
                                                                        queryParams.flipOverlayX ? true : false,
                                                                        queryParams.flipOverlayY ? true : false);
        promises.push(overlayPromise);
    }
    if (promises.length > 0) {
        Promise.all(promises).then(() => {
            sheepyConstructor.finish();
        }).catch((reason) => {
            console.error(reason);
        });
    } else {
        sheepyConstructor.finish();
    }
}

app.listen(process.env.PORT || 8080);
