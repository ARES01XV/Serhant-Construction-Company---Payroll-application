var express = require('express');
var conn = require('../lib/db');
var router = express.Router();




//GET Supervisors Index---------------------------------------------
router.get('/', (req, res) => {
    if (req.session.loggedIn === true) {

        conn.query('SELECT * FROM admins', (err, rows) => {
            if (err) {
                req.flash('error', 'problems')
            } else {
                res.render('supervisors/index', {
                    title: 'SCC Supervisor',
                    sup_session: req.session,
                });
            }
        });
    } else {
        res.redirect('/')
    }
});


// ==================== OPERATIONS ====================
//GET Operations Table---------------------------------------------
router.get('/operations/operations', (req, res) => {
    if (req.session.loggedIn === true) {

        conn.query(`SELECT * FROM logs, employees, departments WHERE logs.employee_id = employees.employee_id 
        AND logs.department_id = departments.department_id
        AND logs.department_id = 1`, (err, rows) => {
            if (err) {
                res.render('supervisors/operations/operations', {
                    title: 'Operations Department',
                    operations: '',
                    sup_session: req.session
                })
            } else {
                res.render('supervisors/operations/operations', {
                    title: 'Operations Department',
                    operations: rows,
                    sup_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});

//GET Operations Edit Form---------------------------------------------
router.get('/operations/operations/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        employee_id = req.params.employee_id;

        conn.query(`SELECT *, TRUNCATE((TIMEDIFF(time_out, time_in)/10000), 0) AS regular, Truncate((TIMEDIFF(time_out, time_in)/10000), 0) - 8 AS overtime FROM payments, logs, employees WHERE payments.log_id = logs.log_id AND payments.employee_id = employees.employee_id AND payments.employee_id = ?`, employee_id, (err, rows) => {
            console.log(rows)
            if (err) {
                // console.log(err)
            } else {
                res.render('supervisors/operations/operations-edit', {
                    title: 'Operations Edit',
                    op_edit: rows[0],
                    sup_session: req.session,
                })
            }
        });

    } else {
        res.redirect('/')
    }

});

//POST Operations Edit Form---------------------------------------------
router.post('/operations_update/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        let update_info = {
            regular_hrs: req.body.regular_hrs, //left: colmn to update; right info from ejs name attr
            overtime_hrs: req.body.overtime_hrs,
        }

        conn.query(`UPDATE logs SET ? WHERE employee_id = + ${req.params.employee_id}`, update_info, (err, rows) => {
            console.log(rows)
            if (err) {
                console.log(err)
                // res.redirect('/supervisors/operations/operations-edit')
                res.redirect('/supervisors/operations/operations')
            } else {
                console.log('worked')
                res.redirect('/supervisors/operations/operations')
            }
        });

    } else {
        res.redirect('/')
    }
});



// ==================== SALES & MANAGEMENT ====================
//GET Sales & Marketing Table---------------------------------------------
router.get('/sales/sales', (req, res) => {
    if (req.session.loggedIn === true ) {

    conn.query(`SELECT * FROM logs, employees, departments WHERE logs.employee_id = employees.employee_id 
        AND logs.department_id = departments.department_id
        AND logs.department_id = 2`, (err, rows) => {
        if (err) {
            res.render('supervisors/sales/sales', {
                title: 'Sales & Management Department',
                sales: '',
                sup_session: req.session

            })
        } else {
            res.render('supervisors/sales/sales', {
                title: 'Sales & Management Department',
                sales: rows,
                sup_session: req.session

            })
        }
    });

    } else {
        res.redirect('/')
    }
});

//GET Sales & Marketing Edit Form---------------------------------------------
router.get('/sales/sales/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        employee_id = req.params.employee_id;

        conn.query(`SELECT *, TRUNCATE((TIMEDIFF(time_out, time_in)/10000), 0) AS regular, Truncate((TIMEDIFF(time_out, time_in)/10000), 0) - 8 AS overtime FROM payments, logs, employees WHERE payments.log_id = logs.log_id AND payments.employee_id = employees.employee_id AND payments.employee_id = ?`, employee_id, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.render('supervisors/sales/sales-edit', {
                title: 'Sales & Marketing Edit',
                sales_edit: rows[0],
                sup_session: req.session
            })
        }
    });

    } else {
        res.redirect('/')
    }

});

//POST Sales & Marketing Edit Form---------------------------------------------
router.post('/sales_update/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        let update_info = {
            regular_hrs: req.body.regular_hrs, //left: colmn to update; right info from ejs name attr
            overtime_hrs: req.body.overtime_hrs,
        }

        conn.query(`UPDATE logs SET ? WHERE employee_id = ${req.params.employee_id}`, update_info, (err, rows) => {
            console.log(rows)
            if (err) {
                console.log(err)
                res.redirect('/supervisors/sales/sales')
            } else {
                // console.log('worked')
                res.redirect('/supervisors/sales/sales')
            }
        });

    } else {
        res.redirect('/')
    }
});


// ==================== ADMINISTRATION ====================
//GET Administration Table---------------------------------------------
router.get('/administration/administration', (req, res) => {
    if (req.session.loggedIn === true ) {

    conn.query(`SELECT * FROM logs, employees, departments WHERE logs.employee_id = employees.employee_id 
        AND logs.department_id = departments.department_id
        AND logs.department_id = 3`, (err, rows) => {
        if (err) {
            res.render('supervisors/administration/administration', {
                title: 'Administration Department',
                administration: '',
                sup_session: req.session

            })
        } else {
            res.render('supervisors/administration/administration', {
                title: 'Administration Department',
                administration: rows,
                sup_session: req.session

            })
        }
    });

    } else {
        res.redirect('/')
    }
});

//GET Administration Edit Form---------------------------------------------
router.get('/administration/administration/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        employee_id = req.params.employee_id;

        conn.query(`SELECT *, TRUNCATE((TIMEDIFF(time_out, time_in)/10000), 0) AS regular, Truncate((TIMEDIFF(time_out, time_in)/10000), 0) - 8 AS overtime FROM payments, logs, employees WHERE payments.log_id = logs.log_id AND payments.employee_id = employees.employee_id AND payments.employee_id = ?`, employee_id, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.render('supervisors/administration/administration-edit', {
                title: 'Administration Edit',
                admin_edit: rows[0],
                sup_session: req.session
            })
        }
    });

    } else {
        res.redirect('/')
    }

});

//POST Administration Edit Form---------------------------------------------
router.post('/admin_update/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        let update_info = {
            regular_hrs: req.body.regular_hrs, 
            overtime_hrs: req.body.overtime_hrs,
        }

        conn.query(`UPDATE logs SET ? WHERE employee_id = ${req.params.employee_id}`, update_info, (err, rows) => {
            console.log(rows)
            if (err) {
                console.log(err)
                res.redirect('/supervisors/administration/administration')
            } else {
                console.log('worked')
                res.redirect('/supervisors/administration/administration')
            }
        });

    } else {
        res.redirect('/')
    }
});



// ==================== ACCOUNTS ====================
//GET Accounts Table---------------------------------------------
router.get('/accounts/accounts', (req, res) => {
    if (req.session.loggedIn === true) {

    conn.query(`SELECT * FROM logs, employees, departments WHERE logs.employee_id = employees.employee_id 
        AND logs.department_id = departments.department_id
        AND logs.department_id = 4`, (err, rows) => {
        if (err) {
            res.render('supervisors/accounts/accounts', {
                title: 'Accounts Department',
                accounts: '',
                sup_session: req.session

            })
        } else {
            res.render('supervisors/accounts/accounts', {
                title: 'Accounts Department',
                accounts: rows,
                sup_session: req.session

            })
        }
    });

    } else {
        res.redirect('/')
    }
});

//GET Accounts Edit Form---------------------------------------------
router.get('/accounts/accounts/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        conn.query(`SELECT *, TRUNCATE((TIMEDIFF(time_out, time_in)/10000), 0) AS regular, Truncate((TIMEDIFF(time_out, time_in)/10000), 0) - 8 AS overtime FROM payments, logs, employees WHERE payments.log_id = logs.log_id AND payments.employee_id = employees.employee_id AND payments.employee_id = ?`, employee_id, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.render('supervisors/accounts/accounts-edit', {
                title: 'Accounts Edit',
                acc_edit: rows[0],
                sup_session: req.session
            })
        }
    });

    } else {
        res.redirect('/')
    }

});

//POST Accounts Edit Form---------------------------------------------
router.post('/acc_update/:employee_id', (req, res) => {
    if (req.session.loggedIn === true) {

        let update_info = {
            regular_hrs: req.body.regular_hrs,
            overtime_hrs: req.body.overtime_hrs,
        }

        conn.query(`UPDATE logs SET ? WHERE employee_id = ${req.params.employee_id}`, update_info, (err, rows) => {
            console.log(rows)
            if (err) {
                console.log(err)
                res.redirect('/supervisors/accounts/accounts')
            } else {
                console.log('worked')
                res.redirect('/supervisors/accounts/accounts')
            }
        });

    } else {
        res.redirect('/')
    }
});



// ==================== DEPARTMENTS TABLE ====================
//GET Departments Table---------------------------------------------
router.get('/depts_tbl/depts_tbl', (req, res) => {
    if (req.session.loggedIn === true) {

    conn.query(`SELECT * FROM payments, departments WHERE payments.department_id = departments.department_id`, (err, rows) => {
        if (err) {
            res.render('supervisors/depts_tbl/depts_tbl', {
                title: 'Accounts Department',
                depts_tbl: '',
                sup_session: req.session

            })
        } else {
            res.render('supervisors/depts_tbl/depts_tbl', {
                title: 'Accounts Department',
                depts_tbl: rows,
                sup_session: req.session

            })
        }
    });

    } else {
        res.redirect('/')
    }
});


//Supervisors Log Out---------------------------------------------
router.get('/supervisors_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
});


module.exports = router;