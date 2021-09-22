const express = require('express');
const router = express.Router();

router.get('/health-check', async (req, res, next) => {
	const a = '1';
	const b = () => {
		console.log('2');
	};
	const c = () =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('3');
			}, 2000);
		});

	req.postOps = [
		{
			fn: () => {
				console.log(a);
				b();
			},
			args: [],
		},
		{
			fn: async () => {
				console.log(await c());
			},
			args: [],
		},
	];

	next();
});

module.exports = {
	router,
};
