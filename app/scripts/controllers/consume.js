'use strict';

angular.module('labInventoryApp').controller('ConsumeCtrl', ['$http', 'globalVar', function ($http, globalVar) {
  var vm = this;

  this.consume = {
    data: "",
    init: function(){
      this.getData();
    },
    getData: function(){
      $http({
        method: 'GET',
        url: globalVar.IPAddress + 'consume',
        params: this.filter,
      }).then(function successCallback(response) {
        console.log('consume', response);
        vm.consume.data = response.data.message;
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    edit: function(data){
      data.enable = true;
    },
    update: function(data){
      data.enable = false;
    },
    add: function(){
      this.isNew = true;
      console.log(this.new);

    },
    cancelInsert: function(){
      this.new = "";
      this.isNew = false;
    }
  }
  this.consume.init();
 
  this.supplier = {
    data:"",
    filter: {},
    add: function(){
      this.isAdd = true;
    },
    insert: function(){
      console.log(this.new.supplierName);
      this.isNew = false;
      $http({
        method: 'POST',
        url: globalVar.IPAddress + 'supplier',
        data: {supplier: this.new.supplierName}
      }).then(function successCallback(response) {
        console.log('supplierInsert', response);
        //vm.supplier.data = response.data.message;
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    cancelInsert: function(){
      this.new = "";
      this.isAdd = false;
    }
  }
}]);