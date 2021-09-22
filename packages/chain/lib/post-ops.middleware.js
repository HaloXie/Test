const postOpsHandler = (req, _, next) => {
	if (req.postOps?.length || 0 > 0) {
		const promises = req.postOps?.map(({ fn, args }) => fn(...args)) || [];
		Promise.all(promises)
			.catch(function ({ message, stack }) {
				console.error(`Post Ops error ${message}`);
				console.error(`Exception Stack: ${stack}`);
			})
			.then(() => next());
	}
};

module.exports = {
	postOpsHandler,
};
