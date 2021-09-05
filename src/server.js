const express = require("express");
const cors = require('cors');
const routes = require('./routes/index.js')

const app = express();
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server Running in PORT ${PORT}`);
})