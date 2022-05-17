const mongoose = require('mongoose');

//
const user_base_schema = new mongoose.Schema({
    "id": Number,
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "startDate": Date,
    "managerId": Number,
    "role": String,
}, { collection: 'users' });
//
const User = mongoose.model('User', user_base_schema);

const get_user_by_credintials = async credintials => {
    //
    console.log('Attemping to login...');
    //
    var user = await User.findOne({email: credintials.email, password: credintials.password}).exec();
    return user;
};


const get_all_users = async () => {
    //
    console.log('Attemping to login...');
    //
    var users = await User.find({}).exec();
    //
    console.log(users);
    console.log(users.length);
    //
    const nest = (employees, id = null, link = 'managerId') =>
        employees
            .map(employee => employee.toJSON())
            .filter(employee => employee[link] === id)
            .map(employee => ({ ...employee, children: nest(employees, employee.id) }));
    return nest(users)
};

const connect_to_db = () => {
    mongoose.connect('mongodb://localhost:27017/walkme_db');
};

module.exports.connect_to_db = connect_to_db;
module.exports.get_all_users = get_all_users;
module.exports.get_user_by_credintials = get_user_by_credintials;