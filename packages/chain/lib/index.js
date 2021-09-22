const express = require('express');
const { postOpsHandler } = require('./post-ops.middleware');
const { router } = require('./index.router');
const { responseHandler } = require('./response-handler.middleware');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(postOpsHandler);
app.use(responseHandler);

app.listen(port, async () => {
	console.info(`server started at http://localhost:${port}`);
});
