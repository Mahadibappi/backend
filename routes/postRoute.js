const express = require('express');
const router = express.Router()

router.post("/", async (req, res) => {
    console.log(req.body)
    res.json("i received data")
})

module.exports = router