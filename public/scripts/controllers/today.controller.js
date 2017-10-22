myApp.controller('TodayController', function (ItemsService) {
    console.log('in today controller');

    var vm = this;
    vm.getPomoNumber = function(num) {
        var array = [];
        for (var i = null; i < num; i++) {
            array.push(i);
        }
        return array;
    };

    vm.open = function() {
        vm.showModal = true;
      };
    
      vm.ok = function() {
        vm.showModal = false;
      };
    
      vm.cancel = function() {
        vm.showModal = false;
      };
    

    vm.todaysDate = ItemsService.getToday;
    vm.events = ItemsService.eventsToday;
    vm.tasks = ItemsService.tasksToday;
    vm.notes = ItemsService.notesToday;

        ItemsService.getTodaysEventsFromDB();
        ItemsService.getTodaysTasksFromDB();
        ItemsService.getTodaysNotesFromDB();

    vm.cancelTask = function(id) {
        ItemsService.removeTask(id);
    };
    vm.cancelNote = function(id) {
        ItemsService.removeNote(id);
    };
    vm.cancelEvent = function(id) {
        ItemsService.removeEvent(id);
    };

    vm.editTask = function(id) {
        vm.open();
        console.log('edit task', id);
        // ItemsService.editTask(id);
    };
    vm.editNote = function(id) {
        ItemsService.editNote(id);
    };
    vm.editEvent = function(id) {
        ItemsService.editEvent(id);
    };

});
