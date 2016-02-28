#Setting Up a Project With React

This is a follow up from master. In master we set up a project with Webpack. Now we're going to add React.

##Install React

```
npm install react react-dom --save
```

##Instal Babel
Babel allows us to use ES6 and it compiles it so that all browsers can read it.

First lets install babel locally
```
npm install babel -g
```

Then we install the following dependencies in in the project directory.
```
npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save
```

###Add Loaders
Now that we've installed the loaders we need to specify on our webpack.config.js how we want to handle our js files.

We have to add the following loader:
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react']
  }
}
```
In here we're telling webpack that we want to run all the js files (exept the ones in `node_modules`), through babel with the presets of react and es2015.

##Create App.js

Create new file called `App.js` inside our app folder it's going to be our first component with the following code:

```
import React from 'react';

const App = React.createClass({
  render () {
    return (
      <div>Hello World!</div>
    )
  }
})

export default App;
```

##Add React to main.js
Before you do this, make sure you add a div with an id of "app" to you `index.html`.
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('app'));
```
