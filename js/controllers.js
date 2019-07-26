angular
  .module("phonecatControllers", [
    "templateservicemod",
    "navigationservice",
    "starwarsservicemod",
    "ui.bootstrap"
  ])

  .controller("HomeCtrl", function($scope, TemplateService, NavigationService) {
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
    $http,
    StarwarService
  ) {
    $scope.template = TemplateService.changecontent("pagination"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Pagination"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.itemsPerPage = 10;

    /**
     * Start Of Star Wars Characters
     */
    $scope.starWarsCharactersPage = 1;
    $scope.starWarsCharactersPageIndex = 0;
    $scope.starWarsCharacters = null;
    $scope.totalStarWarsCharacters = 0;
    $scope.searchText = "";
    $scope.getStarWarsCharacters = function(param, event) {
      // Call a Service Here
      var url = "";
      if (event == "pageChange") {
        $scope.starWarsCharactersPage = param;
        url = "?page=" + $scope.starWarsCharactersPage;
        if ($scope.searchText) {
          url = url + "&search=" + $scope.searchText;
        }
      }
      if (event == "search") {
        $scope.starWarsCharactersPage = 1;
        url = "?search=" + param;
      }
      $http({
        method: "GET",
        url: "https://swapi.co/api/people/" + url
      }).then(
        function successCallback(response) {
          $scope.totalStarWarsCharacters = response.data.count;
          $scope.starWarsCharacters = response.data.results;
          $scope.starWarsCharactersPageIndex =
            ($scope.starWarsCharactersPage - 1) * $scope.itemsPerPage;
        },
        function errorCallback(response) {}
      );
      // var returnObj=
      // End
    };
    // Default Call to getStarWarsCharacters with default page as 1
    $scope.getStarWarsCharacters(1, "pageChange");

    /**
     * End Of Star Wars Characters
     */
  })
  .controller("StarWarsCtrl", function(
    $scope,
    TemplateService,
    NavigationService
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
