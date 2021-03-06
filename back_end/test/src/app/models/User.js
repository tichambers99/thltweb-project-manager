'user strict';
const sql = require("./db.js");
const bcrypt = require('bcrypt')
    //Task object constructor
function User() {};

User.prototype = {
    find: function(user = null, callback) {
        sql.query("SELECT * FROM user  WHERE username = ?", [user], function(err, result) {
            if (err) throw err
            callback(result[0]);
        });
    },
    
    create: function(body, callback) {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);
        const date = new Date(Date.now()).toISOString().slice(0, 10)
        sql.query("INSERT INTO user(username, pass, deleted) VALUES (?,?, ?)", [body.username, body.password, 0], function(err, result) {
            if (err) throw err
            callback(result)
            sql.query("INSERT INTO profiles(user_id, date, email, address, github, avatar, phone) VALUES (?, ?, ?, ?, ?, ?, ?)", [result.insertId, date, body.email, "", "", "", body.phoneNumber], function(err, result) {
                if (err) throw err
            });
        });       
    },


    getProject: function(userId, callback) {
        sql.query("Select project.leader_id,project.name,project.status,project.deadline,project.introduction from project inner join (user_project inner join user on user_project.user_id = user.id where user.id = ?)on project.id = user_project.project_id", [userId], function(err, result) {
            if (err) throw err
            callback(result);
        });
    },

    findUserbyId: function(userId, callback){
        sql.query("Select user.username, profiles.date, profiles.email, profiles.address, profiles.github from profiles INNER JOIN user ON profiles.user_id = user.id WHERE profiles.user_id = ?", [userId], function(err, result) {
            if (err) throw err

            callback(result[0]);

        })
    },

    findUserByIdV2: function (userId, callback){
        sql.query("Select profiles.user_id, profiles.avatar,user.username, profiles.date, profiles.email, profiles.phone, profiles.address, profiles.github from profiles join user on user.id = profiles.user_id where user.id = ?", [userId], function(err, result) {
            if (err) throw err
            callback(result);
        })
    },

    updateInfor: function(reqBody, userId,callback){
        //var values =[reqBody.mail, reqBody.date, reqBody.address, reqBody.github]
        sql.query("Update profiles SET avatar = ?, date = ?, email = ?, address = ?, github = ?, phone = ? WHERE user_id = ?", [reqBody.avatar, reqBody.date, reqBody.email, reqBody.address, reqBody.github, reqBody.phone, userId],  function(err, result){
            if (err) throw err

            callback(result);
        })
    },

    getMembers: function(projectId, callback) {
        sql.query(`select DISTINCT user.username, profiles.avatar 
        from user inner join profiles on user.id = profiles.user_id 
        inner join user_project on user.id = user_project.user_id 
        inner join task on user_project.project_id = task.project_id 
        where task.project_id = ?`, [projectId],  function(err, result){
            if (err) throw err
        })

        sql.query("UPDATE user SET username = ? WHERE id = ?", [reqBody.username, userId], function(err, result){
            if (err) throw err;
        })
        callback();
    },

    changePassword: function(reqBody, userId, callback){
        sql.query("UPDATE user SET pass =? WHERE id = ?", [reqBody.password, userId], function(err, result){
            if(err) throw err;
            console.log(result);
            callback(result);
        })
    }

    
}

module.exports = User;