# vnmodel
_A courteous, easy-on-the-keyboard model for building and managing application state with a minimum of chatter and waste._

### Usage in a nutshell
An `extend` + `subscribe` + `publish` walk-in-the-park, and little else to ruin your day.

### More specifically
Value Node Model is a tree structure to hold your model data, where every node is available for pub-sub binding.  Subscribers will be notified if any change happens to any descendant's value.  

### TODOS
* script-up Webify to `dist/`
* mention how small the current minified version is (it's gonna be tiny)

## Quick Start

#### Install

```bash
$ npm install --save vnmodel
```

#### Build models
```javascript 
const vnm = require('vnmodel')();

// the logged in user
vnm.extend({ user: { firstName: "Joe", lastName: "Podsmack" } });

// some UI state bits under a different path
vnm.extend({ ui: { view: { logout: { buttonState: false, buttonName: 'Logout' } } } });

// why not extend a specific node with a model shared by another app?
vnm.ui.view.extend(mySharedViewModel);
```


#### Subscribe to parts of the model
```javascript
vnm.user.subscribe((key, newValue, oldValue) => {
	if (key === 'firstName') {
    	// update the welcome message in the UI with the newValue
    }
});
```

#### Update the model
```javascript
vnm.ui.view.logout.buttonState.publish(true);
```
