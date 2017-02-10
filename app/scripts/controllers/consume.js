'use strict';

angular.module('labInventoryApp').controller('ConsumeCtrl', ['$http', 'globalVar', 'globalFunction', function ($http, globalVar, globalFunction) {
  var vm = this;

  this.editable = false;
  var getuser = localStorage.getItem("user");
  if(getuser=="kahxin"){
    this.editable = true;
  }

  this.consume = {
    data: "",
    filter:{},
    init: function(){
      this.getData();
    },
    getData: function(){
      // check empty value and remove from sending to backend
      var filterCondition = globalFunction.removeFilterEmpty(this.filter);
      console.log(filterCondition);
      // stringify filter json before send to backend
      //this.filter['condition'] = JSON.stringify(filterCondition);

      $http({
        method: 'POST',
        url: globalVar.IPAddress + 'consume/',
        data: {condition: filterCondition}
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
      var updateData = {
        noItem: data.noItem,
        quantity: data.quantity,
        uPrice: data.uPrice,
        note: data.note
      };
      $http({
        method: 'PUT',
        url: globalVar.IPAddress + 'consume/'+ data._id,
        data: updateData
      }).then(function successCallback(response) {
        console.log('consumeUpdated', response);
        vm.consume.getData();
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    add: function(){
      this.isNew = true;
      $http({
        method: 'POST',
        url: globalVar.IPAddress + 'consume/insert',
        data: this.new
      }).then(function successCallback(response) {
        console.log('consumeInsert', response);
        vm.consume.getData();
        vm.consume.new = {};
        vm.consume.isNew = false;
      }, function errorCallback(response) {
          console.log(response);
      });

    },
    delete: function(id){
      $http({
        method: 'DELETE',
        url: globalVar.IPAddress + 'consume/'+ id,
      }).then(function successCallback(response) {
        console.log('deleteConsume', response);
        vm.consume.getData();
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    cancelInsert: function(){
      this.new = "";
      this.isNew = false;
    },

  };
  this.consume.init();

  /**************** supplier ***************/
  this.supplier = {
    data:"",
    filter: {},
    init: function(){
      this.getData();
    },
    add: function(){
      this.isAdd = true;
    },
    getData: function(){
      $http({
        method: 'GET',
        url: globalVar.IPAddress + 'supplier',
      }).then(function successCallback(response) {
        console.log('supplierData', response);
        vm.supplier.data = response.data.message;
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    insert: function(){
      this.isNew = false;
      $http({
        method: 'POST',
        //headers: headers,
        url: globalVar.IPAddress + 'supplier',
        data: JSON.stringify({supplier: this.new.supplierName})
      }).then(function successCallback(response) {
        console.log('supplierInsert', response);
        vm.supplier.isAdd = false;
        vm.supplier.getData();
      }, function errorCallback(response) {
          console.log(response);
      });
    },
    cancelInsert: function(){
      this.new = "";
      this.isAdd = false;
    }
  };

  vm.supplier.init();
}]);

angular.module('labInventoryApp').directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
}]);