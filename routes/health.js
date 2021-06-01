// Use Express
const express = require('express');

function router_health(){
    const healthRouter = express.Router();
    healthRouter.route('/health')
        .get((req, result) => {
            try {
                const http = require('http');
                const options = {
                    host: '0.0.0.0',
                    port: 8080,
                    timeout: 2000
                };
                const healthCheck = http.request(options, (res) => {
                    console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
                    if (res.statusCode == 200) {
                        result.json( 
                            { 
                                StatusCode: res.statusCode,
                                Status: "OK",
                                Message: "Container healthcheck status"
                            });
                    }
                    else {
                        result.json( 
                            { 
                                StatusCode: res.statusCode,
                                Status: "BAD REQUEST",
                                Message: "Container healthcheck status"
                            });
                    }
                });

                healthCheck.on('error', function (err) {
                    console.error('ERROR');
                    result.json( 
                        { 
                            StatusCode: "Unknown",
                            Status: "error",
                            Message: "Container healthcheck status"
                        });
                });

                healthCheck.end();
            } catch (e){
                console.log(e.toString());
            }
        });
    return healthRouter;
}

module.exports = router_health();