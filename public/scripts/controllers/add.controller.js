myApp.controller('AddItemController', function (ItemsService) {
    console.log('in addcontroller');

    var vm = this;

    vm.itemCategory = false;
    vm.showCategory = function(value) {
        vm.itemCategory = value == 'task';
    }

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