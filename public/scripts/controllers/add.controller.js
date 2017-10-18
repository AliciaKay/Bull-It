myApp.controller('AddItemController', function (ItemsService) {
    console.log('in addcontroller');

    var vm = this;

    vm.itemCategory = {
        name: ''
    };

    vm.getItems = function() {
        ItemsService.getItemFromDB;
    };

    vm.getItems();

    vm.addItem = function () {
        var objectToSend = {
            title: vm.title,
            details: vm.details,
            category: vm.category
        }
        ItemsService.addItemToDB(objectToSend);
    };
});