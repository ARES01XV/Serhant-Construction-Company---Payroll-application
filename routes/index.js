var express = require('express');
var conn = require('../lib/db');
var router = express.Router();



//GET Landing Page---------------------------------------------
router.get('/', (req, res) => {
    res.render('index', {
        title: 'SCC Login'
    })
});

//Accounts Login Post---------------------------------------------
// router.post('/acc_login', (req, res) => {
//     email = req.body.email;
//     password = req.body.password;

//     conn.query('SELECT * FROM employees WHERE emp_email = ? AND BINARY emp_password = ?', [email, password], (err, results) => {
//         if (results.length <= 0) {
//             req.flash('something went wrong, please try again')
//             res.redirect('/')

//         } else {

//             req.session.loggedIn = true,
//             req.session.employee_id = results[0].employee_id,
//             req.session.employee_pic = results[0].employee_pic,
//             req.session.frst_nm = results[0].frst_nm,
//             req.session.last_nm = results[0].last_nm,
//             req.session.department_id = results[0].department_id,
//             res.redirect('/accounts')
//         }
//     });
// });


//Employees Login Post---------------------------------------------
// router.post('/emp_login', (req, res) => {
    
//     email = req.body.email;
//     password = req.body.password;

//     conn.query('SELECT * FROM employees WHERE emp_email = ? AND BINARY emp_password = ?', [email, password], (err, results) => {
//         console.log(results)
//         if (results.length <= 0) {
//             req.flash('something went wrong, please try again')
//             res.redirect('/')

//         } else {
//             req.session.loggedIn = true,
//             req.session.employee_id = results[0].employee_id,
//             req.session.employee_pic = results[0].employee_pic,
//             req.session.frst_nm = results[0].frst_nm,
//             req.session.last_nm = results[0].last_nm,
//             req.session.department_id = results[0].department_id,
//             res.redirect('/employees')
//         }
//     });
// });

//Supervisors Login Post---------------------------------------------
// router.post('/sup_login', (req, res) => {
//     email = req.body.email;
//     password = req.body.password;

//     conn.query('SELECT * FROM admins WHERE admin_email = ? AND BINARY admin_password = ?', [email, password], (err, results) => {
//         console.log(results)
//         if (results.length <= 0) {
//             req.flash('something went wrong, please try again')
//             res.redirect('/')

//         } else {

//             req.session.loggedIn = true,
//             req.session.admin_id = results[0].admin_id,
//             req.session.admin_pic = results[0].admin_pic,
//             req.session.admin_nm = results[0].admin_nm,
//             res.redirect('/supervisors')
//         }
//     });
// });


module.exports = router;
