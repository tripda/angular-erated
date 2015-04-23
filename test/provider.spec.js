describe('Service', function() {
    var eratedService, $httpBackend, angularLoadMock;

    var defaultConfig = {foo: 'bar', hello: 'world'};

    beforeEach(module('angular-erated'));

    beforeEach(function() {
        angular
            .module('angular-erated')
            .config(function(eratedServiceProvider) {
                eratedServiceProvider.setApiKey('123');
                eratedServiceProvider.setDefaultConfig(defaultConfig);
            });

        module(function($provide) {
            $provide.service('angularLoad', function() {
                this.loadScript = jasmine.createSpy();
            });
        });
    });

    beforeEach(inject(function(_eratedService_, _$httpBackend_, _angularLoad_) {
        eratedService = _eratedService_;
        $httpBackend = _$httpBackend_;
        angularLoadMock = _angularLoad_;
    }));

    it('API key sets properly', function() {
        expect(eratedService.getApiKey()).toBe('123');
    });

    describe('getUserProfile', function() {
        it('calls external API and returns properly', function() {
            var httpReturnData = {foo: 'bar'};

            $httpBackend
                .expectGET('//api.erated.co/v1/users/456?partner=' + eratedService.getApiKey())
                .respond(200, httpReturnData);

            var spy = jasmine.createSpy();

            eratedService
                .getUserProfile('456')
                .then(spy);

            $httpBackend.flush();

            expect(spy).toHaveBeenCalledWith(httpReturnData);
        });

        it('calls external API and returns 404', function() {
            var httpReturnData = {foo: 'bar'};

            $httpBackend
                .expectGET('//api.erated.co/v1/users/456?partner=' + eratedService.getApiKey())
                .respond(404, httpReturnData);

            var spy = jasmine.createSpy();

            eratedService
                .getUserProfile('456')
                .then(null, spy);

            $httpBackend.flush();

            expect(spy).toHaveBeenCalledWith(httpReturnData);
        });
    });

    it('loads Erated integration script', function() {
        eratedService.loadSetupScript();

        expect(angularLoadMock.loadScript).toHaveBeenCalledWith('//cdn.erated.co/iframe/erated_imp.js');
    });

    it('setup configuration variables', function() {
        eratedService.setupVars({});

        expect(window.eRated).toBeDefined();
    });

    describe('default config', function() {
        it('getter should work', function() {
            expect(eratedService.getDefaultConfig()).toBe(defaultConfig);
        });

        it('should be merged when setting up vars', function() {
            var vars = eratedService.setupVars(defaultConfig);

            expect(vars.config).toBeDefined();

            expect(vars.config.foo).toBeDefined();
            expect(vars.config.foo).toBe(defaultConfig.foo);

            expect(vars.config.hello).toBeDefined();
            expect(vars.config.hello).toBe(defaultConfig.hello);
        });
    });
});

