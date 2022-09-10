module.exports.isSalesAgent = function (req, res, next) {
    if (req.user.role === 'sales_agent') {
        return next();
    } else {
        res.send('Only sales agent allowed to access this resource. <a href="http://localhost:5000/login">Go here to login again</a>');
    }
}

module.exports.isManager = function (req, res, next) {
    if (req.user.role === 'manager') {
        return next();
    } else {
        res.send('Only manager allowed to access this resource. <a href="http://localhost:5000/login">Go here to login again</a>');
    }
}

module.exports.isDirector = function (req, res, next) {
    if (req.user.role === 'director') {
        return next();
    } else {
        res.send('Only director allowed to access this resource. <a href="http://localhost:5000/login">Go here to login again</a>');
    }
}
module.exports.isDirector = function (req, res, next) {
    if (req.user.role === 'manager'  || req.user.role === 'sale_agent') {
        return next();
    } else {
        res.send('Only director allowed to access this resource. <a href="http://localhost:5000/login">Go here to login again</a>');
    }
}
