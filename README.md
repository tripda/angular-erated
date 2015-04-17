#angular-erated

Display the [Erated](http://erated.co) plugin on your AngularJS application.

##Installing via bower

The recommended way to install angular-erated is through [Bower](http://bower.io).

>bower install angular-erated

## Usage

First you need to inject angular-erated in your module definition.

```javascript
angular.module('myAngularApp', ['angular-erated']);
```

Then configurate it by setting your API Key.

```javascript
angular
    .module('myAngularApp')
    .config(function(eratedServiceProvider) {
        eratedServiceProvider.setApiKey('YOURAPIKEY');
    });
```

Now you can display it on your page by using a directive

```javascript
<eratedplugin align="vertical" view="buyer" emailhash="EMAILHASH"></eratedplugin>
```
