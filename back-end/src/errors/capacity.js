function capacity(req, res, next) {
    const { capacity } = req.body.data;
    if (isNaN(capacity) || capacity === null || capacity === "") {
        return res.status(400).send("The 'capacity' field must be a number and cannot be null or empty.");
    }

    next();
}

module.exports = capacity;
