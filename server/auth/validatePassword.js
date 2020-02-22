const validatePassword = (password, callback) => {
    if (password.length === 0 || password === undefined) {
        return callback("No password to validate")
    }
    if (password.length < 5) {
        return callback ("Password too short")
    }
    return callback(null)
}

module.exports = validatePassword