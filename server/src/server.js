const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const shellJs = require('shelljs');
const cors = require('cors');
const timeout = require('connect-timeout');
const chalk = require('chalk');
const _ = require('lodash');

app.use(bodyParser.json())
app.use(cors());
app.use((req, res, next) => {
  console.table({
    "URL": req.url,
    "Query:": JSON.stringify(req.query),
    "Method": req.method,
    "Body": JSON.stringify(req.body),
    "Params:": JSON.stringify(req.params),
  })
  next();
})
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});
app.post('/curl', timeout('30s'), (req, res) => {
  const { body } = req;
  console.log("Running Command: ", chalk.whiteBright(body.code));
  shellJs.exec(body.code, { silent: true }, (code, stdout, stderr) => {
    console.log(chalk.whiteBright.bold("Command complete!"));
    let result = ""
    if (!code) {
      result = stdout;
    } else {
      result = stderr
    }
    res.send(result);
  })
});

app.post('/getpods', timeout('30s'), (req, res) => {
  const { body: {
    context, namespace
  } } = req;
  const shellCode = `kubectl --context ${context} -n ${namespace} get pods -o json`;
  console.log(chalk.redBright("Running Command: "), chalk.whiteBright.bold(shellCode));
  shellJs.exec(shellCode, { silent: true }, (code, stdout, stderr) => {
    console.log(chalk.whiteBright.bold("Command complete!"));
    let pods;
    let error = undefined;
    if (!code) {
      pods = _.get(JSON.parse(stdout), 'items', []).map(pod => pod.metadata.name);
    } else {
      pods = []
      error = stderr
    }
    res.json({
      pods,
      error
    });
  })
})
app.use('/', express.static(path.resolve(__dirname, '../../dist/')))


app.listen(8080, () => {
  console.log(`Server started at: http://127.0.0.1:8080`);
})