#angular-erated

[![Build Status](https://api.travis-ci.org/TripdaApp/angular-erated.svg?branch=master)](http://travis-ci.org/TripdaApp/angular-erated)

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

###Defining default options

You might find yourself having to pass the same parameters over and over again for the directives when displaying the widget. You can avoid this by defining default options when configurating with the provider.

```javascript
angular
    .module('myAngularApp', ['angular-erated'])
    .config(function(eratedServiceProvider) {
        var defaults = {
            color: '#C24A17',
            localizationFile: 'path-to-my-localization-file.json'
        };

        eratedServiceProvider.setDefaultConfig(defaults);
    });
```

Now whenever you want to display the widget, you no longer have to pass the color and location file parameters anymore as they are set by default.

###Displaying Reviews

Reviews can be displayed by calling a method:

```javascript
.module('myAngularApp')
    .controller('sampleCtrl', function(eratedService) {
        eratedService.addReview("Very good!", true, true);
        eratedService.addReview("I'll definitely buy from this seller again, I'm completely satisfied.", true, true);
    });
```
##Hiding Connections

You might not want to display all available connections and hide a few, you can achieve this when configuring with the provider:

```javascript
angular
    .module('myAngularApp', ['angular-erated'])
    .config(function(eratedServiceProvider) {
        var defaults = {
            exclude: ['ebay', 'facebook']
        };

        eratedServiceProvider.setDefaultConfig(defaults);
    });
```
By doing this, the user will not see Ebay and Facebook as connectable services.
