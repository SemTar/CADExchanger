const express = require("express");
const app = express();
const jsonParser = express.json();

const dotenv = require('dotenv');
dotenv.config();
const frontHost = process.env.FRONT_HOST;
const frontPort = process.env.FRONT_PORT;
const backHost = process.env.BACK_HOST;
const backPort = process.env.BACK_PORT;


app.use(express.static('./public'));
app.post("/cone", jsonParser, async function(request, response){
    let segmentsCount = request.body.segmentsCount;
    let  coneHeight = request.body.coneHeight;
    let  baseRadius = request.body.baseRadius;
    let data = {};

    try {
        data.segmentsCount = isRightSegCount(segmentsCount);
        data.coneHeight = isRightConeHeight(coneHeight);
        data.baseRadius = isRightBaseRadius(baseRadius);

        let res = await fetch(`http://${backHost}:${backPort}/cone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*',
            },
            body: JSON.stringify(data),
        })
        let result = await res.json();

        response.json(result);

    } catch (e) {
        response.json({err: e.message });
    }


});

app.get("/cone", function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});


app.listen(frontPort);
console.log(`start server on http://${frontHost}:${frontPort}/`);



function isRightSegCount(segCount) {
    let natNum = segCount.match(/^\d+$/)[0];
    let err = new Error('segment count must be a natural number > 2');

    if (!natNum) {
        throw err
    }
    if ( +natNum === 1 || +natNum === 2  || +natNum === 0 ) {
        throw err
    }

    return +natNum
}

function isRightConeHeight(coneHeight) {
    let number = coneHeight.match(/^-?\d*\.?\d+$/)[0];
    let err = new Error('cone height must be a number');

    if (!number) {
        throw err
    }

    return +number
}

function isRightBaseRadius(baseRadius) {
    let number = baseRadius.match(/^\d*\.?\d+$/)[0];
    let err = new Error('base radius must be a number > 0');

    if (!number) {
        throw err
    }
    if (+number === 0) {
        throw err
    }

    return +number
}