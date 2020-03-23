const validCookie = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(403).json({"error":"Invalid session"})
    }
}

exports.validCookie = validCookie