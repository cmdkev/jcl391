# Screen saver for uchicago jcl 391 lab screen (thanks to [uchicago vis+pl lab](https://github.com/uchicago-vis-pl-lab/vis-pl-lab))

Dependencies are present to provide infra support, namely linting.
To install, run yarn, then to lint, run yarn lint. Easy peasy.

If you're trying to test the auto-reload locally, you'll have to run through a server using e.g. one of:

```
$ ruby -run -ehttpd . -p8000
$ python2 -m SimpleHTTPServer
$ python3 -m http.server 8000
```

...and head to [http://localhost:8000/](http://localhost:8000/).

`main.js` is the file with the list of things to display and probably what you want to edit.
