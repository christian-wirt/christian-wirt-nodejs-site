const User = require('../models/user-model');
const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator');

getHome = async (req, res) => {

    //res.render('/index', { root: '../client/views'})

    res.sendFile('/index.html', { root: './client/views'});
}

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            });
        });
}

createUser2 = (req, res) => {

    const user = new User({
        _id: req.body.id,
        name: req.body.name,
        admin: req.body.isAdmin
    });
    user.save()
    .then(() => {
        return res.redirect('/#createUser');
    })
    .catch(error => {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'User already exists!',
            });
        }
        return res.status(400).json({
            error,
            message: 'User not created!',
        });
    });
}

updateUser2 = async (req, res) => {
    let id = req.body.id;
    const name = req.body.name;
    const isAdmin = req.body.isAdmin;

    if (typeof id !== 'number') {
        id = parseInt(id, 10);
    }

    await User.findById({ _id: id}).then((user, err) => {
        if (!user) {
            return res.status(404).json({
                success: false, 
                error: 'User id does not exist!',
            });
        }
        
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }
        user.name = name;
        user.admin = isAdmin;
        user
            .save()
            .then(() => {
                return res.redirect('/#createUser')
            })
            .catch(err => {
                return res.status(404).json({
                    err,
                    message: 'User not found!'
                });
            });
    }).catch(err => console.log(err));


}

updateUser = async (req, res) => {
    const body = req.body;


    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }
        user.name = body.name;
        user.admin = body.admin;
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                });
            });
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: `User not found`,
            });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

deleteUser2 = async (req, res) => {

    let id = req.body.id;

    if (typeof id !== 'number') {
        id = parseInt(id, 10);
    }

    await User.findOneAndDelete({ _id: id }).then((user, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: `User not found`,
            });
        }

        res.redirect('/#createUser');
        
    }).catch(err => console.log(err));
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }).then((user, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: `User not found` 
            });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await User.find({}).then((users, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res.status(404).json({ 
                success: false, 
                error: `User not found` 
            });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
}

module.exports = {
    getHome,
    createUser,
    createUser2,
    updateUser,
    updateUser2,
    deleteUser,
    deleteUser2,
    getUsers,
    getUserById,
};