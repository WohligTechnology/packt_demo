// JavaScript Document
var firstapp = angular.module("firstapp", [
  "ui.router",
  "phonecatControllers",
  "templateservicemod",
  "navigationservice"
]);

firstapp.config(function(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $locationProvider
) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/template.html",
      controller: "HomeCtrl"
    })
    .state("form", {
      url: "/form",
      templateUrl: "views/template.html",
      controller: "FormCtrl"
    })
    .state("fizzbuzz", {
      url: "/fizzbuzz",
      templateUrl: "fizzbuzz.html",
      controller: "FizzBuzzCtrl"
    });
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(isproduction);
});

firstapp.directive("img", function($compile, $parse) {
  return {
    restrict: "E",
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

firstapp.directive("autoHeight", function($compile, $parse) {
  return {
    restrict: "EA",
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      var windowHeight = $(window).height();
      $element.css("min-height", windowHeight);
    }
  };
});
