angular
    .module('angular-erated')
    .directive('eratedplugin', ['eratedService', eratedPlugin]);

function eratedPlugin(eratedService) {
    var templateContent = '<div class="erated"></div>';

    return {
        restrict: 'EA',
        link: function($scope, $element, attr) {
            var options = {};

            if(attr.align) {
                options.align = attr.align;
            }

            if(attr.view) {
                options.view = attr.view;
            }

            if(attr.emailhash) {
                options.emailhash = attr.emailhash;
            }

            if(attr.username) {
                options.username = attr.username;
            }

            if(attr.image) {
                options.image = attr.image;
            }

            eratedService.loadSetupScript();
            eratedService.setupVars(options);
        },
        template: templateContent
    };
}

