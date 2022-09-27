const dbConnection  = require('../db.js');
const fs = require('fs');
const hash_password = require('../utils/hash_password.js');
const token_service = require('../utils/token_service.js');
const config = JSON.parse(fs.readFileSync('./email-config.json', 'utf8'));
const nodemailer = require("nodemailer");

class Auth
{
    async register(body)
    {    
        try {
            var hash = await hash_password(body.password);
            const token = token_service.generateTokens({user: body.login});
            const [row] = await dbConnection.execute("INSERT INTO `user` (`login`, `password`, `email`, `token`) VALUES ('" + body.login + "', '" + hash + "', '" +  body.email + "', '" + token + "')");

            const transporter = nodemailer.createTransport(config);
            const url = `http://localhost:3000/confirm-email/${token}`;
            transporter.sendMail({
                to: body.email,
                subject: 'Confirm Email',
                html: `Please click this email to confirm your email: <a href="${url}">Click here</a>`,
            });

        } catch (e) {
            console.log(e);
        }
    }

    async activate(confirm_token)
    {    
        try {
            const [row2] = await dbConnection.execute("SELECT COUNT(`id`) FROM `user` WHERE `token` = '" + confirm_token + "'");
            if(row2[0]['COUNT(`id`)'] == 0) {
                return "Token";
            }
            const [row1] = await dbConnection.execute("SELECT COUNT(`id`) FROM `user` WHERE `token` = '" + confirm_token + "' AND `activate` = true");
            if(row1[0]['COUNT(`id`)'] != 0) {
                return "Already";
            }
            const [row] = await dbConnection.execute("UPDATE `user` SET `activate` = true WHERE `token` = '" + confirm_token + "' AND `activate` = false");
            return "Success";
        } catch (e) {
            console.log(e);
        }
    }

    async login(body)
    {    
        try {
            var hash = await hash_password(body.password);
            const [row] = await dbConnection.execute("SELECT `login`, `password`, `email`, `activate` FROM `user`");
            var x = "";
            row.forEach(async (element) => {
                if(body.login == element.login && hash == element.password) {
                    if(element.activate == true) {
                        const token = token_service.generateTokens({user: body.login});
                        x = token;
                        const [x1] = await dbConnection.execute("UPDATE `user` SET `token` = '" + token + "' WHERE `login` = '" + body.login + "'");
                    }
                }
            });
            return x;
        } catch (e) {
            console.log(e);
        }
    }

    async logout(id)
    {
        try {
            const [row] = await dbConnection.execute("UPDATE `user` SET `token` = ' ' WHERE `id` = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
    }

    async password_reset(body)
    {
        try {
            const token = token_service.generateTokens({user: body.email});
            const [row] = await dbConnection.execute("UPDATE `user` SET `activate` = false, `token` = '" + token + "' WHERE `email` = '" + body.email + "'");
            const transporter = nodemailer.createTransport(config);
            const url = `http://localhost:3000/new-password/${token}`;
            transporter.sendMail({
                to: body.email,
                subject: 'Confirm Email',
                html: `Please click this email to confirm your email: <a href="${url}">Click here</a>`,
            });
        } catch (e) {
            console.log(e);
        }
    }

    async password_reset_second(confirm_token, body)
    {    
        try {
            var hash = await hash_password(body.new_password);
            const [row] = await dbConnection.execute("UPDATE `user` SET `activate` = true, `token` = '', password = '" + hash + "' WHERE `token` = '" + confirm_token + "' AND `activate` = false");
        } catch (e) {
            console.log(e);
        }
    }

    async check_confirm_token(confirm_token)
    {    
        try {
            const [row] = await dbConnection.execute("SELECT COUNT(`id`) FROM `user` WHERE `token` = '" + confirm_token + "' AND `activate` = false");
            if(row[0]['COUNT(`id`)'] == 0) {
                return false;
            }
            else {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new Auth();
