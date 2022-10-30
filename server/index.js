const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const Category = require('./models/category');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

const app = express();

const dbURI = process.env.DB_ACCOUNT;
mongoose.connect(dbURI)
.then((result) => app.listen(PORT, () => console.log('Connected to PORT: ' + PORT)) )
.catch((err) => console.log(err));


app.use(express.urlencoded({extended: true}));
app.use(express.json());





app.use(cors());


app.get('/api/recipes', (req, res) => {
    Recipe.find()
        .then((results) => {
            res.send(results);
        })
        .catch((err) => console.log(err));
});

app.get('/api/products/categories', (req, res) => {
    let param = req.query.searchParam;

    Recipe.aggregate([
        // { $match: { title: { $regex: '.*' + param + '.*', $options: 'i'}}},
        { $group: {_id: '$category', count: {$sum: 1}}},
        { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category'}},
        { $unwind: '$category'}
    ]).exec((error, results) => {
        if(error) throw error;
        res.send(results);
    })
});

app.get('/api/search/products', (req, res) => {
    let param = req.query.searchParam;

    Recipe.find({ title: {$regex: '.*' + param + '.*', $options: 'i'}})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => console.log(error));
});




// app.get('/api/categoriesBySearch', (req, res) => {
//     let param = req.query.searchParam;
    
//     Recipe.aggregate([
//         { $match: {title: {$regex: '.*' + param + '.*', $options: 'i'}} },
//         { $group: {_id: '$category', count: {$sum: 1}}},
//         { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo'}},
//         { $unwind: '$_id'},
//         { $unwind: '$categoryInfo' },

//     ]).exec((error, recipes) => {
//         if(error) throw error;
//         res.send(recipes);
//     })
// });


app.get('/api/categories', (req, res) => {
   Category.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => console.log(err));
});


app.post('api/subscribe', (req, res) => {
    console.log(req.body);
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'My App <testmailer993@gmail.com>',
        subject: `<${req.body.email}> Your Subscription`,
        html: `<div>
            <h1>You're Subscribed to My App</h1>
            <p>You will be getting weekly notifications about any updates, news and merchandise!</p>
            <p style="color: pink; font-style: italics;">Enjoy!</p>
        </div>`
    };

    transport.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    })
    
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });