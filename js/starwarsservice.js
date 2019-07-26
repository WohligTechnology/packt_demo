var starwarsservicemod = angular.module("starwarsservicemod", []);
starwarsservicemod.factory("StarwarService", function($http) {
  function callStarWarsPagination(
    param,
    event,
    itemsPerPage,
    searchText,
    callback
  ) {
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
        returnObj.next = response.data.next;
        returnObj.starWarsCharactersPageIndex =
          (returnObj.page - 1) * itemsPerPage;

        callback(null, returnObj);
      },
      function errorCallback(response) {
        callback("Error", response);
      }
    );
  }
  var returnObj = {
    callStarWars: callStarWarsPagination,
    getAllStarWarsCharacter: function(callback) {
      var page = 1;
      var checkLimit = true;
      var arrayData = [];
      async.whilst(
        function(callback) {
          return callback(null, checkLimit);
        },
        function(callback) {
          callStarWarsPagination(page, "pageChange", 10, "", function(
            err,
            data
          ) {
            if (err) {
              callback(err, "Failed From getAllStarWarsCharacter");
            } else {
              if (_.isEmpty(data.next)) {
                checkLimit = false;
              }
              arrayData = _.union(arrayData, data.starWarsCharacters);
              page = page + 1;
              callback();
            }
          });
        },
        function(err) {
          returnObj.allCharacters = arrayData;
          callback(null, arrayData);
        }
      );
    }
  };
  return returnObj;
});
