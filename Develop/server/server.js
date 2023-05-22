const express = require('express');
const dotenv= require('dotenv');
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3020;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
