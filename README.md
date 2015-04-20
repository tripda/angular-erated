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
<eratedplugin 
    align="vertical" 
    view="buyer" 
    emailhash="EMAILHASH"
    username="MyUser"
    image="path-to-my-image.png"
    color="#0C5CA1"
    location="Sao Paulo, Brazil"
/>
```

###Retrieving user data

Although the directive provides you with the widget fully displayed by just passing an user's hashed email, you can still manually retrieve this information by calling a method that returns user information in JSON format. This method is also useful if you just need to know if a given email has signed up to Erated.

```javascript
eratedService.getUserProfile('EMAIL-HASH')
    .then(function(userData) {
        // User exists and its information is passed to this callback.
    }, function() {
        // Nobody has signed up to Erated with this email.
    });
```
