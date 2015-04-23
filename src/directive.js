angular
    .module('angular-erated')
    .directive('eratedplugin', ['eratedService', eratedPlugin]);

function eratedPlugin(eratedService) {
    var templateContent = '<div class="erated"></div>';

    return {
        restrict: 'EA',
        link: function($scope, $element, attr) {
            var options = attr;

            window.eRated = null;
            window.erated = null;
            window.eratedPlugin = null;
            window.init_eRated = null;

            eratedService.loadSetupScript();
            eratedService.setupVars(options);
        },
        template: templateContent
    };
}

