var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//GET Supervisors Login---------------------------------------------
router.get('/', (req, res) => {
    res.render('sup_login', {
        title: 'Supervisors Login'
    });
});

//Supervisors Login Post---------------------------------------------
router.post('/sup_login', (req, res) => {
    email = req.body.email;
    password = req.body.password;

    conn.query('SELECT * FROM admins WHERE admin_email = ? AND BINARY admin_password = ?', [email, password], (err, results) => {
        console.log(results)
        if (results.length <= 0) {
            req.flash('something went wrong, please try again')
            res.redirect('/')

        } else {

            req.session.loggedIn = true,
                req.session.admin_id = results[0].admin_id,
                req.session.admin_pic = results[0].admin_pic,
                req.session.admin_nm = results[0].admin_nm,
                res.redirect('/supervisors')
        }
    });
});

module.exports = router;
