myApp.service('ItemsService', function ($http) {
    console.log('in itemsService');

    var self = this;
    // // not static!!!! 
    // // dynamic data MUST BE IN AN OBJECT

    self.itemListObj = {item: []};

  self.addItemToDB = function (itemListObject) {
    $http({
      method: 'POST',
      url: '/add',
      data: itemListObject
    }).then(function() {
      self.getItemFromDB();
    })
  }

  self.getItemFromDB = function () {
    $http.get('/add').then(function (response) {
      self.itemListObject.data = response.data;
    });
  }
});