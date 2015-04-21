beforeEach(module('angular-erated'));

describe('erated directive', function() {
    var scope, compile, eratedService;

    beforeEach(inject(function($rootScope, $compile, _eratedService_) {
        scope = $rootScope.$new();
        compile = $compile;
        eratedService = _eratedService_;

        spyOn(eratedService, 'loadSetupScript');
        spyOn(eratedService, 'setupVars');
    }));

    it('should replace HTML properly', function() {
        var element = compile('<eratedplugin />')(scope);

        expect(element.html()).toBe('<div class="erated"></div>');
    });

    it('should call methods of EratedService', function() {
        var element = compile('<eratedplugin foo="bar" />')(scope);

        expect(eratedService.loadSetupScript).toHaveBeenCalled();

        expect(eratedService.setupVars).toHaveBeenCalled();
    });
});
