var starwarsservicemod = angular.module("starwarsservicemod", []);
starwarsservicemod.service("StarwarService", function($http) {
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
  this.callStarWars = function(param, event, itemsPerPage, searchText) {
    var returnObj = {};
    var url = "";
    returnObj.page = 1;
    if (event == "pageChange") {
      returnObj.page = param;
      url = "?page=" + returnObj.page;
      if (searchText) {
        url = url + "&search=" + searchText;
      }
    }
    if (event == "search") {
      returnObj.page = 1;
      url = "?search=" + param;
    }
    $http({
      method: "GET",
      url: "https://swapi.co/api/people/" + url
    }).then(
      function successCallback(response) {
        returnObj.totalStarWarsCharacters = response.data.count;
        returnObj.starWarsCharacters = response.data.results;
        returnObj.starWarsCharactersPageIndex =
          (returnObj.page - 1) * itemsPerPage;
        console.log("returnObj-->", returnObj);
        return returnObj;
      },
      function errorCallback(response) {}
    );
  };

  this.init();
});
