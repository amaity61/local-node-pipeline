const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World! Deployed locally via Jenkins and Docker Auto deployment.</h1>');
});

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});