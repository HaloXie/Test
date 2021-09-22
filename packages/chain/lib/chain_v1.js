const asyncNext = asyncFn => (error, result) => {
	if (error) {
		console.error(error);
		return { error, success: false };
	}
	if (processFn) {
		return processFn(result);
	}

	return { success: true, data: result };
};

const Chain = {
	start(result) {
		return new NextChain(result);
	},
};
class NextChain {
	constructor(prevResult) {
		this.prevResult = prevResult;
	}

	next(fn, ...args) {
		if (!this.prevResult.success) {
			return new NextChain(prevResult);
		}

		let result = undefined;
		fn(this.prevResult.result, ...args, (error, callbackResult) => {
			if (error) {
				console.error(error);
				result = { error, success: false };
			}
			result = { result: callbackResult, success: false };
		});

		return new NextChain(result);
	}
	async asyncNext(fn, ...args) {
		if (!this.prevResult.success) {
			return prevResult;
		}

		const result = await Promise.all([fn(this.prevResult.result, ...args)]) // 这么写只是为了要类型判断
			.then(promiseResult => ({ success: true, result: promiseResult[0] }))
			.catch(error => {
				console.error(error);
				return { error, success: false };
			});

		return result;
	}
}
// const initNextChain = result => new NextChain(result);
// const chain = Chain.start().asyncNext(a).then(initNextChain).; // 这里仍需要不停的进行 then 所以失败

function express() {
	var funcs = []; // 待执行的函数数组

	var app = function (req, res) {
		var i = 0;

		function next() {
			var task = funcs[i++]; // 取出函数数组里的下一个函数
			if (!task) {
				// 如果函数不存在,return
				return;
			}
			task(req, res, next); // 否则,执行下一个函数
		}

		next();
	};

	/**
	 * use方法就是把函数添加到函数数组中
	 * @param task
	 */
	app.use = function (task) {
		funcs.push(task);
	};

	return app; // 返回实例
}

module.exports = {};
