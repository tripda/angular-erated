describe('Service', function() {
    var eratedService, $httpBackend, angularLoadMock;

    beforeEach(module('angular-erated'));

    beforeEach(function() {
        angular.module('angular-erated')
            .config(function(eratedServiceProvider) {
                eratedServiceProvider.setApiKey('123');
            });
    });

    beforeEach(function() {
        angularLoadMock = {};
        angularLoadMock.loadScript = jasmine.createSpy();

        module(function($provide) {
            $provide.service('angularLoad', function() {
                this.loadScript = angularLoadMock.loadScript;
            });
        });
    });

    beforeEach(inject(function(_eratedService_, _$httpBackend_) {
        eratedService = _eratedService_;
        $httpBackend = _$httpBackend_;
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
});

