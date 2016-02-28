#Project Setup with Webpack

Make sure you have node and npm installed before you begin.

##Create your project
Open your terminal, navigate to your desired directory and create a new node project.

```
npm init
```

##Add Webpack
Install webpack and webpack-dev-server and save them in your npm developer dependencies.
Then we create a new file called where all our webpack configuration will be.

```
npm install webpack  webpack-dev-server --save-dev
touch webpack.config.js
```

###Webpack Config
This is the basic setup of a Webpack Config file, basically what is going on, is that you define your entry file, and then the path where you want to output everything.

```
module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  }
}
```


###Create an HTML file

Create your index.html file inside your public folder, don’t forget to add your bundle.js file with the path that you defined on your Webpack config.

##Stylesheets

Most likely you want to use Sass or any other preprocessor for CSS. Webpack allows you to compile and add other really cool plugins to manage your styles.

##Compiling SASS into CSS
To be able to compile Sass into CSS we have to use loaders. Loaders are some sort of plugins that basically tell web pack “When you find this kind of file, do his with it”. For compiling Sass into CSS we’re going to install some loaders on the terminal:

```
npm install css-loader style-loader sass-loader html-loader node-sass —save-dev
```

these loaders work together piping the information from one another. First you use the sass loader to get the sass files, the css loader to transpile them to css, and the style-loader to convert your css to javascript so it can be used by bundle.js

To pipe loaders like this we write them from right to left. and there’s two ways in which you can add loaders:

```
{
  test: /\.scss/,
  loaders: ["style", "css", "sass"]
}
```

or

```
{
  test: /\.scss/,
  loader: “style!css!sass"
}
```

Your webpack.config.js file should looks something like this:

```
module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
```

We’re almost ready, now you just have to require your main sass file on main.js so that it will be compiled by webpack.

On main.js add:

```
require(‘./sass/manifest.scss’);
```

You can run `webpack` on the terminal and it should load the styles.

##Extract files into CSS files

Our styles should be working, but if you notice, they are being added by the js file, as opposed to having our external stylesheet. For this we’re going to use another external plugin called extract-text-webpack-plugin.

In the command line, run:
```
npm install extract-text-webpack-plugin —save-dev
```

And we need to change some configuration on our webpack.config.js file:

# We require the Extract Text Plugin:
```
var ExtractText = require(‘extract-text-webpack-plugin’);
```

# Then we modify our loaders:
```
{
  test: /\.scss/,
  loader: ExtractText.extract(“style”, “css!sass")
 }
 ```

The extract method on the plugin takes two parameters, the first one is what to do with the extracted contents, and the second one is what do to with the main file.

# Lastly, we have to specify the output file, and we do this the following way:

```
var ExtractText = require(‘extract-text-webpack-plugin’);
module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  },
  module: {
     loaders: [
          {
              test: /\.scss/,
              loader: ExtractText.extract(“style”, “css!sass”)

           }
     ]
  },
plugins: [
     new ExtractPlugin(‘./styles.css')
]
}
```

When you run `webpack` in the terminal again, you can see that now the styles are being loaded from an external stylesheet.

##Autoprefixer and Postcss

PostCSS is a plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. In other words it allows you to write your css without vendor prefixes and compiles it with all the necessary vendor prefixers for browser compatibility. Cool right?

To set this up, we fist have to install a couple of things on the terminal:
```
npm install autoprefixer postcss postcss-loader --save-dev
```

Then on our webpack.config.js we have to add post css as a loader, and specify the version to use.

# We first require autoprefixer at the top:
```
var autoprefixer = require(‘autoprefixer’);
```

# Then we add the loader to our stylesheets:
```
{
  test: /\.scss/,
  loader: ExtractText.extract(“style”, “css!postcss!sass”)
}
```

# Lastly we need to add some configuration for the postcss plugin. Your webpack config file should look something like this:

```
var ExtractText = require(‘extract-text-webpack-plugin’);
var autoprefixer = require(‘autoprefixer’);

module.exports = {
  entry: './app/main.js',
  output: {
    path: './public/',
    filename: 'bundle.js'
  },
  module: {
     loaders: [
          {
              test: /\.scss/,
              loader: ExtractText.extract(“style”, “css!postcss!sass”)
           }
     ]
  },
     plugins: [
          new ExtractPlugin(‘./styles.css')
     ],
     postcss: [
          autoprefixer({ browsers: [‘last 2 versions’] })
     ]
}
```

And that’s it! You should be able to run `webpack` and then `webpack-dev-server` and see your project on http://localhost:8080/public

#Running on Webpack Dev Server
On `package.json` you can add a script to configure webpack-dev-server to run a specific subdirectory (you can also specify a specific port and other configurations). Add the following script to your `package.json`

```
"scripts": {
  "start": "webpack && webpack-dev-server --content-base public/"
}
```

Now you can run `npm start` on the terminal and go to http://localhost:8080 to go to `public/index.html` from your compiled project.
