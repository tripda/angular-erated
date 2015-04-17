angular
    .module('angular-erated')
    .directive('eratedplugin', ['eratedService', eratedPlugin]);

function eratedPlugin(eratedService) {
    var templateContent = '<div class="erated horizontal"></div>';

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

            eratedService.loadSetupScript();
            eratedService.setupVars(options);
        },
        template: templateContent
    };
}

