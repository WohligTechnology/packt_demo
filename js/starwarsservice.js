var starwarsservicemod = angular.module("starwarsservicemod", []);
starwarsservicemod.service("StarwarService", function() {
  this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";

  var d = new Date();
  this.year = d.getFullYear();

  this.init = function() {
    this.header = "views/header.html";
    this.menu = "views/menu.html";
    this.content = "views/content/content.html";
    this.footer = "views/footer.html";
  };

  this.changecontent = function(page) {
    this.init();
    var data = this;
    data.content = "views/content/" + page + ".html";
    return data;
  };
  this.callStarWars = function() {
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
  };

  this.init();
});
