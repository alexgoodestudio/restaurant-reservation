function capacity(req, res, next) {
    console.log(req.body.data);
    const { capacity } = req.body.data;

    // Check if 'capacity' is not a number, is null, or is an empty string
    if (isNaN(capacity) || capacity === null || capacity === "") {
        return res.status(400).send("The 'capacity' field must be a number and cannot be null or empty.");
    }

    next();
}

module.exports = capacity;
