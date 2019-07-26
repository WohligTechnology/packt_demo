angular
  .module("phonecatControllers", ["templateservicemod", "navigationservice"])

  .controller("HomeCtrl", function(
    $scope,
    TemplateService,
    NavigationService,
    $timeout
  ) {
    $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller("FormCtrl", function(
    $scope,
    TemplateService,
    NavigationService,
    $timeout
  ) {
    $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.formSubmitted = false;

    $scope.submitForm = function(data) {
      console.log(data);
      $scope.formSubmitted = true;
    };
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
