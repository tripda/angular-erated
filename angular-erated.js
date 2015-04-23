angular
    .module('angular-erated', ['angularLoad']);

angular
    .module('angular-erated')
    .provider('eratedService', [eratedServiceProvider]);

function eratedServiceProvider() {
    var apiKey = "";
    var defaultConfig = {};

    this.setApiKey = function(key) {
        apiKey = key;
    }

    this.setDefaultConfig = function(config) {
        defaultConfig = config;
    }

    this.$get = ['$q', '$http', 'angularLoad', function($q, $http, angularLoad) {
        var service = {
            apiKey: apiKey,
            getApiKey: getApiKey,
            getUserProfile: getUserProfile,
            getDefaultConfig: getDefaultConfig,
            loadSetupScript: loadSetupScript,
            setupVars: setupVars
        };

        return service;

        function getApiKey() {
            return apiKey;
        }

        function getUserProfile(emailHash) {
            var deferred = $q.defer();

            $http.get('//api.erated.co/v1/users/'+emailHash+'?partner='+getApiKey())
                .success(function(data) {
                    deferred.resolve(data); 
                })
                .error(function(data, status) {
                    deferred.reject(data); 
                });

            return deferred.promise;
        }

        function getDefaultConfig() {
            return defaultConfig;
        }

        function loadSetupScript() {
            angularLoad.loadScript('//cdn.erated.co/iframe/erated_imp.js');
        }

        function setupVars(options) {
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

            var defaultConfig = service.getDefaultConfig();

            for(var key in defaultConfig) {
                window.eRated.config[key] = defaultConfig[key];
            }

            return window.eRated;
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

