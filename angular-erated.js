angular
    .module('angular-erated', ['angularLoad']);

angular
    .module('angular-erated')
    .provider('eratedService', [eratedServiceProvider]);

function eratedServiceProvider() {
    var apiKey = "";

    this.setApiKey = function(key) {
        apiKey = key;
    }

    this.$get = ['$q', '$http', 'angularLoad', function($q, $http, angularLoad) {
        var service = {
            apiKey: apiKey,
            isEmailRegistered: isEmailRegistered,
            loadSetupScript: loadSetupScript,
            setupVars: setupVars
        };

        return service;

        function isEmailRegistered(emailHash) {
            var deferred = $q.defer();

            $http.get('//api.erated.co/v1/users/'+emailHash+'?partner='+apiKey+'&mode=marketplaces')
                .success(function(data, status, headers, config) {
                    deferred.resolve(true);
                })
                .error(function(data, status, headers, config) {
                    deferred.resolve(false);
                });

            return deferred.promise;
        }

        function loadSetupScript() {
            angularLoad.loadScript('//cdn.erated.co/iframe/erated_imp.js');
        }

        function setupVars(options) {
            if (typeof options == "undefined") {
                options = {};
            }

            if (!options.align) {
                options.align = "horizontal";
            }

            if (!options.view) {
                options.view = "buyer";
            }

            if (!options.emailhash) {
                options.emailhash = "9999999";
            }

            if (!options.username) {
                options.username = "username";
            }

            reviews = [];

            window.eRated = {
                config: {
                    align: options.align,
                    key: apiKey,
                    color: options.color,
                    reputationMode: "marketplace",
                    privacy: {
                        firstNameOnly: false
                    },
                    view: options.view,
                    type: "html",
                    width: 380
                },
                userData: {
                    name: options.username,
                    sha1Email: options.emailhash,
                    location: options.location,
                    image: options.image,
                    reputationData: {
                        numberOfReviews: 0,
                        percentPositiveReviews: 0,
                        reviews: reviews
                    }
                }
            }
        }
    }];
}


angular
    .module('angular-erated')
    .directive('eratedplugin', ['eratedService', eratedPlugin]);

function eratedPlugin(eratedService) {
    var templateContent = '<div class="erated"></div>';

    return {
        restrict: 'EA',
        link: function($scope, $element, attr) {
            var options = attr;

            eratedService.loadSetupScript();
            eratedService.setupVars(options);
        },
        template: templateContent
    };
}

