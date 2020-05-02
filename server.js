const express = require('express');

let app = express();
const PORT = process.env.PORT || 80;
app.use(express.static('src'));
app.listen(PORT,'0.0.0.0', function(){
    console.log("Node app is running on port",PORT);
});
