myApp.controller('TodayController', function (ItemsService) {
    console.log('in today controller');

    var vm = this;

    vm.events = ItemsService.eventsToday;
    vm.tasks = ItemsService.tasksToday;
    vm.notes = ItemsService.notesToday;

        ItemsService.getTodaysEventsFromDB();
        ItemsService.getTodaysTasksFromDB();
        ItemsService.getTodaysNotesFromDB();

    });
