angular
  .module("phonecatControllers", ["templateservicemod", "navigationservice"])

  .controller("HomeCtrl", function(
    $scope,
    TemplateService,
    NavigationService,
    $timeout
  ) {
    $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Fizz Buzz"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.numbers = _.times(100, function(n) {
      var number = n + 1;
      var obj = {
        number: number,
        fizz: number % 3 == 0,
        buzz: number % 5 == 0
      };
      return obj;
    });
  })

  .controller("PaginationCtrl", function(
    $scope,
    TemplateService,
    NavigationService,
    $timeout
  ) {
    $scope.template = TemplateService.changecontent("pagination"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Pagination"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller("StarWarsCtrl", function(
    $scope,
    TemplateService,
    NavigationService,
    $timeout
  ) {
    $scope.template = TemplateService.changecontent("star-wars"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Star Wars"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller("headerctrl", function($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on("$stateChangeSuccess", function(
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {});
  });
