var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//GET Employee Login---------------------------------------------
router.get('/', (req, res) => {
    res.render('emp_login', {
        title: 'Employee Login'
    });
});

//Employees Login Post---------------------------------------------
router.post('/emp_login', (req, res) => {

    email = req.body.email;
    password = req.body.password;

    conn.query('SELECT * FROM employees WHERE emp_email = ? AND BINARY emp_password = ?', [email, password], (err, results) => {
        console.log(results)
        if (results.length <= 0) {
            req.flash('something went wrong, please try again')
            res.redirect('/')

        } else {
            req.session.loggedIn = true,
                req.session.employee_id = results[0].employee_id,
                req.session.employee_pic = results[0].employee_pic,
                req.session.frst_nm = results[0].frst_nm,
                req.session.last_nm = results[0].last_nm,
                req.session.department_id = results[0].department_id,
                res.redirect('/employees')
        }
    });
});

module.exports = router;
