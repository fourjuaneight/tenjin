# 


## Usage
### Prerequisites
Install the latest version of [Hugo](https://gohugo.io/getting-started/installing/).

[npm](https://docs.npmjs.com/getting-started/what-is-npm) is used to managed dependencies. To asure compatibility, version 8.14.0 of node and version 6.4.1 of npm are recommended. You can manage node versions using [nvm](https://github.com/creationix/nvm#installation). Once installed, you can use the config file on the repo to install and download the recommeneded node/npm version.

From the root directory of the repo, run the install command for the recommended node version:
```
nvm install
```

Then, tell nvm to use that version:
```
nvm use
```

Once those are set, run npm to install all dependencies:
```
npm install
```

### Development
Running the local server can be done the following two commands.

Gulp watches for any changes done to critical CSS files:
```
gulp watch
```

Hugo runs a local server with live reload for the site itself.
```
hugo server
```

The project should be available on [localhost:1313](http://localhost:1313) from your browser.

## Structure
```
|--assets           // Files that will pass through the asset pipeline
|  |--icons         // Icons files used for favicon, iOS webclip, OpenGraph icons, and other alike.
|  |--fonts         // Font files.
|  |--img      	    // Image files.
|  |--js            // Custom scripts and external libraries minified and locally loaded.
|  |--css           // Sass files are compiled, minified and autoprefixed.
|--content          // Pages and collections
|--layouts          // This is where all templates go
|  |--_default      // This is where base templates and blocks live
|  |--partials      // This is where includes live
|  |--shortcodes    // This is where shortcodes live
|  |--index.html    // The index page
|--static     	    // Files in here end up in the public folder
```