const registerUser = (req, res) => {
    if (!req.body.email) {
        res.status(400)
        throw new Error("please add an email")
    }
    res.send("user register success")
}

module.exports = {
    registerUser,
}