myApp.controller('EditItemController', function (ItemsService) {
    console.log('in editcontroller');

    var vm = this;

    vm.editTask = function(task) {
        ItemsService.editTask(task);
    };

    vm.editNote = function(note) {
        ItemsService.editNote(note);
    };
    
    vm.editEvent = function(note) {
        ItemsService.editEvent(note);
    };
});