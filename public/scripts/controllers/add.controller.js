myApp.controller('AddItemController', function (ItemsService) {
    console.log('in addcontroller');

    var vm = this;
    vm.todaysDate = ItemsService.getToday;

    vm.clearAllInputs = function () {
        console.log('clearing all the inputs');
        vm.title = '';
        vm.details = '';
        vm.eventDate = '';
        vm.eventTime = '';
        vm.eventLocation = '';
        vm.priority = '';
        vm.due = '';
        vm.pomos = '';
        vm.date='';
        vm.item = ''
    };

    vm.addEvent = function () {
        var eventToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.eventDate),
            time: vm.eventTime.toLocaleTimeString(),
            location: vm.eventLocation
        };
        console.log('in add controller addEvent function', eventToSend);
        ItemsService.addEventToDB(eventToSend);
        vm.clearAllInputs();
    };

    vm.addTask = function() {
        var taskToSend = {
            title: vm.title,
            details: vm.details,
            priority: parseInt(vm.priority),
            due: new Date(vm.due),
            pomos: vm.pomos
        };
        console.log('in add controller addTask function', taskToSend);
        ItemsService.addTaskToDB(taskToSend);
        vm.clearAllInputs();
    };

    vm.addNote = function() {
        var noteToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.date)
        };
        console.log('in add controller addNote function', noteToSend);
        ItemsService.addNoteToDB(noteToSend)
        vm.clearAllInputs();
    };
});