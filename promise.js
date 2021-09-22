const exec = async () => {
	try {
		const fn = str =>
			new Promise(function (resolve, reject) {
				console.log(Date.now());
				setTimeout(() => {
					reject(str);
				}, 2000);
			});
		const a = await fn('1111').catch(() => 3333);
		console.log(a);
	} catch (err) {
		console.log(err);
	}
	console.log(Date.now());
	console.log(2);
};

const fn = (str, cb) => {
	if (str === 'a') {
		return cb(null, 'a1');
	} else {
		return cb('fn error');
	}
};

const a = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('a');
		}, 2000);
	});

const b = result => {
	console.log(result);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('b');
		}, 2000);
	});
};

const c = result => {
	console.log(result);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			throw new Error('c');
		}, 2000);
	});
};
