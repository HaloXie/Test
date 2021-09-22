const responseHandler = (req, res, next) => {
	res.json({});

	next();
};

module.exports = { responseHandler };
