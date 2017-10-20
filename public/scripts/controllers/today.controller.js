myApp.controller('TodayController', function (ItemsService) {
    console.log('in today controller');

    var vm = this;
    vm.getPomoNumber = function(num) {
        var array = [];
        for (var i = null; i < num; i++) {
            array.push(i);
        }
        console.log('in the getPomoNumber function:', array);
        return array;
    };

    vm.todaysDate = ItemsService.getToday;
    vm.events = ItemsService.eventsToday;
    vm.tasks = ItemsService.tasksToday;
    vm.notes = ItemsService.notesToday;

        ItemsService.getTodaysEventsFromDB();
        ItemsService.getTodaysTasksFromDB();
        ItemsService.getTodaysNotesFromDB();

    });
