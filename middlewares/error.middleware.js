module.exports = (err, req, res, next) => {
    try {
        res.status(err.status || 500);
        res.send({error: err.message, ok: false});
        next();
    } catch (error) {
        res.status(500).json({error, ok: false})
    }
}