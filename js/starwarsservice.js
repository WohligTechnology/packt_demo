var starwarsservicemod = angular.module("starwarsservicemod", []);
starwarsservicemod.factory("StarwarService", function($http) {
  return {
    callStarWars: function(param, event, itemsPerPage, searchText, callback) {
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
          callback(null, returnObj);
        },
        function errorCallback(response) {
          callback("Error", response);
        }
      );
    }
  };
});
