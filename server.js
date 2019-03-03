
const express = require('express'),              mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      productRoute=require('./routes/productRoute'),
      db = require("./config/db")


const app = express();

let database;
if(process.env.NODE_ENV === 'production'){
    database = process.env.MONGO_ATLAS
} else {
    database = db.DB
}
    mongoose.connect(database, { useNewUrlParser: true})
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

    app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api', productRoute)


// serve static asset if in prod
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.header('Authorization' , process.env.JWT_LOGIN_KEYS);
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server started on port${port}`))