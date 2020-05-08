# Curl UI

This will basically convert a request to cURL request and using your machine's curl it will execute it.

### Basic cURL support
This will literally run a cURL with arguments provided

```
curl <args>
```

### Kubectl Support

To hit protected urls from inside cluster. Which is basically

```
kubectl exec -it podName -- curl <args>
```

### Any custom curl

```
<PATH OF CURL> args
```

## To Run the application:

### Global Installation 
```
Work in progress
```

### Local installation
```
git clone git@github.com:legndery/curl-ui.git
```
Then only install the production dependancies and start it:
```
cd curl-ui
npm i --only=prod
npm start
```
go to http://127.0.0.1:8080


## Changelog

07-05-2020:
- Add Running curl suppport by running a nodejs server
- Add kubectl support
- Delete cookie support