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

###Find out whether an email has an Erated Account

You might want to know if someone has signed up on Erated with a given email address, you can get this information by using this method:

```javascript
eratedService.isEmailRegistered('EMAIL-HASH')
    .then(function(result) {
        if (result) {
            // There is an user with this email!
        } else {
            // There is no user with this email...
        }
    });
```
