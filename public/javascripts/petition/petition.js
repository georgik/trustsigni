var app = angular.module('petitionApp', ['ngGrid']);
app.controller("PetitionController", function($scope, $http) {
    $scope.count = "Načítavam...";
    $scope.isDetailVisible = false;
    $scope.loadedDetail = false;
    $scope.actName = document.URL.indexOf("=") != -1 ? document.URL.split("=")[1] : "test";
    $scope.signatories = [];

    $scope.gridOptions = {
        data: 'signatories',
        columnDefs: [
            {field:'name', displayName:'Signatár'},
            {field:'organization', displayName:'Organizácia'},
            {field:'city', displayName:'Mesto'}
        ]
    };

    $http.get('/act/' + $scope.actName +'/count').success(function(data) {
        $scope.count = data.count;
    });

    $scope.showDetails = function() {
        $scope.isDetailVisible = true;
        if (!$scope.loadedDetail) {
            $http.get('/act/'+ $scope.actName +'/signatories/shortlist').success(function(data) {
                $scope.signatories = data.signatories;
            });

            $scope.loadedDetail = true;
        }
    };

    $scope.hideDetails = function() {
        $scope.isDetailVisible = false;
    }
});