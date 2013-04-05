var app = angular.module('managementApp', ['ngGrid']);

app.controller("ManagementController", function($scope, $http) {
    $scope.actName = "";
    $scope.secret = "";
    $scope.count = 0;
    $scope.signatories = [];
    $scope.isExportVisible = false;
    $scope.exportString = "";
    $scope.gridOptions = {
        data: 'signatories',
        columnDefs: [
            {field:'signatoryId', displayName:'Id'},
            {field:'title', displayName:'Titul'},
            {field:'name', displayName:'Meno'},
            {field:'surname', displayName:'Priezvisko'},
            {field:'organization', displayName:'Organizácia'},
            {field:'street', displayName:'Ulica'},
            {field:'city', displayName:'Mesto'},
            {field:'zip', displayName:'PSČ'},
            {field:'email', displayName:'E-mail'},
            {field:'hide', displayName:'Skryť info'},
            {field:'answer', displayName:'Odpoveď'},
            {field:'created', displayName:'Vytvorený'},
            {
                field:'valid',
                displayName:'Platný',
                cellTemplate: '<button ng-click="changeValidity(row.entity)">{{row.getProperty(col.field)}}</button>'
            }
        ]
    };

    $scope.updateButtonClickHandler = function() {
        $http.get('/signatoriesNumber?actName=' + $scope.actName +'&tg_format=json').success(function(data) {
            $scope.count = data.signatoriesNumber[0][0];
        });

        $http.get('/detailedList?actName='+ $scope.actName + '&secret=' + $scope.secret +'&tg_format=json').success(function(data) {
            $scope.signatories = data.signatories;
        });

    };

    $scope.changeValidity = function(signatory) {
        $http.get('/setSignatoryValid?actName='+ $scope.actName + '&secret=' + $scope.secret + '&valid=' + !signatory.valid + '&signatoryId=' + signatory.signatoryId).success(function(data) {
            signatory.valid = !signatory.valid;
        });
    };

    $scope.serializeSignatory = function(signatory) {
        var result = signatory.signatoryId + ";";
        result += signatory.title + ";";
        result += signatory.name+ ";";
        result += signatory.surname+ ";";
        result += signatory.organization+ ";";
        result += signatory.street+ ";";
        result += signatory.city+ ";";
        result += signatory.zip+ ";";
        result += signatory.email+ ";";
        result += signatory.hide+ ";";
        result += signatory.answer+ ";";
        result += signatory.created+ ";";
        result += signatory.valid+ ";";
        return result;
    };

    $scope.exportButtonClickHandler = function() {
        var result = "";
        angular.forEach($scope.signatories, function(signatory) {
            result += $scope.serializeSignatory(signatory) + "\n";
        });
        $scope.exportString = result;
        $scope.isExportVisible = true;
    };

});