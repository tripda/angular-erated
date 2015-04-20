describe('Service', function() {
    var eratedService, $httpBackend;

    beforeEach(module('angular-erated'));

    beforeEach(function() {
        angular.module('angular-erated')
            .config(function(eratedServiceProvider) {
                eratedServiceProvider.setApiKey('123');
            });
    });

    beforeEach(inject(function(_eratedService_, _$httpBackend_) {
        eratedService = _eratedService_;
        $httpBackend = _$httpBackend_;
    }));

    it('API key sets properly', function() {
        expect(eratedService.getApiKey()).toBe('123');
    });

});

