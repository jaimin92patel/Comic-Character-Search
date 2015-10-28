var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $location) {
  var url = $location.absUrl().split('/');
  
  var characterID = url[url.length - 1];

  var mainID = url[url.length - 3];
  var challengerID = url[url.length - 1];

  var factory = {};

  factory.routes = {
    characterAPI: $resource('/characters/:action', {}, {
      fetch: {method: 'GET', params: {title: '@title', action: 'search'}, isArray: false },
      details: {method: 'GET', params: {id: characterID, action: 'details'}, isArray: false },
      replace: {method: 'GET', params: {id: '@id', action: 'search'}, isArray: false },
      versus: {method: 'GET', params: {main: mainID, challenger: challengerID, action: 'versus'}, isArray: false },
    })
  };

  return factory;
});

app.controller('CharacterController', function($scope, resources) {

  $scope.searchCharacters = function() {
    

    resources.routes.characterAPI.fetch({title: $scope.title}, function done(response) {
      
      if (response.results.length > 0)
        $scope.characters = { main: response.results.shift(0), alternatives: response.results };
      else 
        $scope.characters = response.results;

    });
  };

  $scope.replaceCharacters = function(characters) {
    

    resources.routes.characterAPI.fetch({title: $scope.title}, function done(response) {
      console.log('You are in character replace'+characters.id);
      if (response.results.length > 0)
        $scope.characters = { main: characters, alternatives: response.results};
      else 
        $scope.characters = response.results;

    });
  };

  $scope.toggleCast = function() {
    if ($scope.displayCast) {
      $scope.displayCast = false;
    }
    else {
      $scope.displayCast = true;
    }
  };

});

app.controller('CharacterDetailController', function($scope, resources) {

  function init() {
    resources.routes.characterAPI.details(function done(response) {
        console.log(response);
        $scope.Character = response;
       
    });
  }
  init();

});

app.controller('characterVersusController', function($scope, resources) {

  function init() {
    resources.routes.characterAPI.versus(function done(response) {
        $scope.character = response;
    });
  }
  init();

});