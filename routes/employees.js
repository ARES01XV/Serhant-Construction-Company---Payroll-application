var express = require('express');
var conn = require('../lib/db');
var router = express.Router();




//GET Employee Index---------------------------------------------
router.get('/', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 1 || req.session.department_id === 2 || req.session.department_id === 3) {

    employee_id = req.session.employee_id;
    
    conn.query(`SELECT * FROM logs, employees, departments WHERE logs.employee_id = employees.employee_id
    AND logs.department_id = departments.department_id AND logs.employee_id = ? ORDER BY logs.date DESC`, employee_id,(err, rows) => {
            if (err) {
                console.log(err)
                res.render('employees/index', {
                    title: 'Employees',
                    emp_info: '',
                    emp_session: req.session
                });
            } else {
                res.render('employees/index', {
                    title: 'Employees',
                    emp_info: rows,
                    emp_session: req.session
                });
            }
        });
    } else {
        res.redirect('/')
    }
});




// **************** LOG OUTS **************************************
//Employees Log Out---------------------------------------------
router.get('/employees_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
});


module.exports = router;