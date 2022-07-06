var express = require('express');
var conn = require('../lib/db');
var router = express.Router();




//GET Accounts Index---------------------------------------------
router.get('/', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query('SELECT * FROM employees WHERE department_id = 4', (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/index', {
                    title: 'SCC Accounts',
                    acc_session: req.session,
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
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        // conn.query('SELECT * FROM employees WHERE department_id = 1', (err, rows) => {
        conn.query(`SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id 
        AND payments.department_id = departments.department_id
        AND payments.department_id = 1`, (err, rows) => {
        if(err){
            res.render('accounts/operations/operations', {
                title: 'Operations Department',
                operations: '',
                acc_session: req.session
            })
        } else{
            res.render('accounts/operations/operations', {
                title: 'Operations Department',
                operations: rows,
                acc_session: req.session
            })
        }
    });

    } else {
        res.redirect('/')
    }
});

//GET Operations Edit Form---------------------------------------------
router.get('/operations/operations/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {
        
        // conn.query(`SELECT * FROM employees WHERE employee_id = ${req.params.employee_id}`, (err, rows) => {
        conn.query(`SELECT * FROM payments, employees WHERE payments.employee_id = employees.employee_id 
        AND payments.employee_id = ${req.params.employee_id}`, (err, rows) => {
            if(err){
                console.log(err)
            } else{
                res.render('accounts/operations/operations-edit', {
                    title: 'Operations Edit',
                    op_edit: rows[0],
                    acc_session: req.session
                })
            }
        });
        
    } else {
        res.redirect('/')
    }
    
});

//POST Operations Edit Form---------------------------------------------
router.post('/operations_update/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        let update_info = {
            // employee_pic: req.body.employee_pic,
            // frst_nm: req.body.frst_nm,
            // last_nm: req.body.last_nm,
            cycle_hrs: req.body.cycle_hrs,
            month_pay: req.body.cycle_pay
        }

        conn.query(`UPDATE payments SET ? WHERE employee_id = + ${req.params.employee_id}`, update_info, (err, rows) => {
            if(err){
                console.log(err)
                res.redirect('/accounts/operations/operations-edit')
            } else{
                res.redirect('/accounts/operations/operations')
            }
        });

    } else {
        res.redirect('/')
    }
});

//GET Operations Payslip Form---------------------------------------------
router.get('/operations/operations/pay/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        // let varSQL = `SELECT * FROM departments, employees WHERE employee_id = ${req.params.employee_id}`
        let varSQL = `SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id AND payments.department_id = departments.department_id AND payments.employee_id = ${req.params.employee_id}`

        conn.query(varSQL, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/operations/payslip', {
                    title: 'Employee Payslip',
                    op_pay: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});


// ==================== SALES & MANAGEMENT ====================
//GET Sales & Marketing Table---------------------------------------------
router.get('/sales/sales', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query(`SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id 
        AND payments.department_id = departments.department_id
        AND payments.department_id = 2`, (err, rows) => {
            if (err) {
                res.render('accounts/sales/sales', {
                    title: 'Sales & Management Department',
                    sales: '',
                    acc_session: req.session
                })
            } else {
                res.render('accounts/sales/sales', {
                    title: 'Sales & Management Department',
                    sales: rows,
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});

//GET Sales & Marketing Edit Form---------------------------------------------
router.get('/sales/sales/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query(`SELECT * FROM payments, employees WHERE payments.employee_id = employees.employee_id 
        AND payments.employee_id = ${req.params.employee_id}`, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/sales/sales-edit', {
                    title: 'Sales & Marketing Edit',
                    sales_edit: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }

});

//POST Sales & Marketing Edit Form---------------------------------------------
//GET Sales & Marketing Payslip Form---------------------------------------------
router.get('/sales/sales/pay/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        let varSQL = `SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id AND payments.department_id = departments.department_id AND payments.employee_id = ${req.params.employee_id}`

        conn.query(varSQL, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/sales/payslip', {
                    title: 'Employee Payslip',
                    sales_pay: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});


// ==================== ADMINISTRATION ====================
//GET Administration Table---------------------------------------------
router.get('/administration/administration', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query(`SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id 
        AND payments.department_id = departments.department_id
        AND payments.department_id = 3`, (err, rows) => {
            if (err) {
                res.render('accounts/administration/administration', {
                    title: 'Administration Department',
                    administration: '',
                    acc_session: req.session
                })
            } else {
                res.render('accounts/administration/administration', {
                    title: 'Administration Department',
                    administration: rows,
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});

//GET Administration Edit Form---------------------------------------------
router.get('/administration/administration/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query(`SELECT * FROM payments, employees WHERE payments.employee_id = employees.employee_id 
        AND payments.employee_id = ${req.params.employee_id}`, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/administration/administration-edit', {
                    title: 'Administration Edit',
                    admin_edit: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }

});

//POST Administration Edit Form---------------------------------------------
//GET Administration Payslip Form---------------------------------------------
router.get('/administration/administration/pay/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        let varSQL = `SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id AND payments.department_id = departments.department_id AND payments.employee_id = ${req.params.employee_id}`

        conn.query(varSQL, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/administration/payslip', {
                    title: 'Employee Payslip',
                    admin_pay: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});


// ==================== ACCOUNTS ====================
//GET Accounts Table---------------------------------------------
router.get('/accounts/accounts', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        conn.query(`SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id 
        AND payments.department_id = departments.department_id
        AND payments.department_id = 4`, (err, rows) => {
            if (err) {
                res.render('accounts/accounts/accounts', {
                    title: 'Accounts Department',
                    accounts: '',
                    acc_session: req.session
                })
            } else {
                res.render('accounts/accounts/accounts', {
                    title: 'Accounts Department',
                    accounts: rows,
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});

//GET Accounts Edit Form---------------------------------------------
router.get('/accounts/accounts/edit/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {
        
        conn.query(`SELECT * FROM payments, employees WHERE payments.employee_id = employees.employee_id 
        AND payments.employee_id = ${req.params.employee_id}`, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/accounts/accounts-edit', {
                    title: 'Accounts Edit',
                    acc_edit: rows[0],
                    acc_session: req.session
                })
            }
        });
        
    } else {
        res.redirect('/')
    }

});

//POST Accounts Edit Form---------------------------------------------
//GET Accounts Payslip Form---------------------------------------------
router.get('/accounts/accounts/pay/:employee_id', (req, res) => {
    if (req.session.loggedIn === true && req.session.department_id === 4) {

        let varSQL = `SELECT * FROM payments, employees, departments WHERE payments.employee_id = employees.employee_id AND payments.department_id = departments.department_id AND payments.employee_id = ${req.params.employee_id}`

        conn.query(varSQL, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.render('accounts/accounts/payslip', {
                    title: 'Employee Payslip',
                    acc_pay: rows[0],
                    acc_session: req.session
                })
            }
        });

    } else {
        res.redirect('/')
    }
});




// **************** LOG OUT **************************************
//Accounts Log Out---------------------------------------------
router.get('/accounts_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
});



module.exports = router;