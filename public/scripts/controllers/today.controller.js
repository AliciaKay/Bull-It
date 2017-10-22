myApp.controller('TodayController', function (ItemsService, $uibModal) {
    console.log('in today controller');
    var vm = this;

    vm.openModal = function () {
        $uibModal.open({
          templateUrl: 'views/editModal.html',
          controller: function ($uibModalInstance) {
            vm.ok = function () {
              $uibModalInstance.close();
            };
          
            vm.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          }
        })
      };


    vm.getPomoNumber = function(num) {
        var array = [];
        for (var i = null; i < num; i++) {
            array.push(i);
        }
        return array;
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
