const express = require('express');

const journal = require('./journal');

const main = async () => {
    const app = express();

    app.use('/journal', await journal());
    
    app.listen(4000, () => {
        console.log('app is running on 4000')
    });
}

main();