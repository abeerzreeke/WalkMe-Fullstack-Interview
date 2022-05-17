const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const utils = require('./utils');

app.use(cors())
utils.connect_to_db();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})

// respond with "hello world" when a GET request is made to the homepage
app.post('/login', async (req, res) => {
    //
    var user_data = {
        email: req.body.email,
        password: req.body.password,
    };
    //
    var user = await utils.get_user_by_credintials(user_data);
    //
    if (user) {
        console.log('Welcome ' + user.firstName);
        res.json({user,authenticated:true})
        return res.redirect("//localhost:3000/OrgPage");
    }
    res.json({authenticated:false,errorMessage:'Wrong eamil Or Password'})
    //
    console.log('No user found - Redirect to login')
    
});


app.get("/api/org_hir", async (req, res) => {
    console.log('get api data')
    var users = await utils.get_all_users();
    return res.json({ "users": users })
});


app.listen(5000, () => { console.log("Server started on port 5000") })