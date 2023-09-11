const express = require("express");
let app = express();
const jsonParser = express.json();

const dotenv = require('dotenv');
dotenv.config();
app.post("/cone", jsonParser, async function(request, response){
    let data = request.body;
    let N = data.segmentsCount;
    let R = data.baseRadius;
    let Pi = Math.PI;
    let A = [0, data.coneHeight, 0];
    let trianglesArray = [];

    for (let i = 0; i < N; i++) {
        trianglesArray.push(
            A.concat(
                [R * Math.cos(2 * Pi * i / N), 0, R * Math.sin(2 * Pi * i / N)],
                [R * Math.cos(2 * Pi * (i+1) / N), 0, R * Math.sin(2 * Pi * (i+1) / N)]
            )
        )
    }

    response.send(JSON.stringify(trianglesArray));
});


app.listen(process.env.BACK_PORT);
console.log(`start server on http://${process.env.BACK_HOST}:${process.env.BACK_PORT}/`);