myApp.controller('AddItemController', function (ItemsService) {
    console.log('in addcontroller');

    var vm = this;
    vm.todaysDate = new Date();

    vm.getEvents = function() {
        console.log('in add controller getEvents function');
        ItemsService.getEventsFromDB;
    };

    vm.getEvents();

    vm.addEvent = function () {
        var eventToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.eventDate),
            time: vm.eventTime.toLocaleTimeString(),
            location: vm.eventLocation
        }
        console.log('in add controller addEvent function', eventToSend);
        ItemsService.addEventToDB(eventToSend);
        vm.title = '';
        vm.details = '';
        vm.eventDate = '';
        vm.eventTime = '';
        vm.eventLocation = '';
    };

    vm.getTasks = function() {
        console.log('in add controller getTasks function');
        ItemsService.getTasksFromDB;
    };

    vm.getTasks();

    vm.addTask = function() {
        var taskToSend = {
            title: vm.title,
            details: vm.details,
            priority: parseInt(vm.priority),
            due: new Date(vm.due),
            pomos: vm.pomos
        }
        console.log('in add controller addTask function', taskToSend);
        ItemsService.addTaskToDB(taskToSend);
        vm.title = '';
        vm.details = '';
        vm.priority = '';
        vm.due = '';
        vm.pomos = ''
    }

    vm.getNotes = function() {
        console.log('in add controller getNotes function');
        ItemsService.getNotesFromDB;
    };

    vm.getNotes();

    vm.addNote = function () {

        var noteToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.date),
        }
        console.log('in add controller addNote function');
        ItemsService.addNoteToDB(noteToSend);
        vm.title='',
        vm.details='',
        vm.date='';
    };
});