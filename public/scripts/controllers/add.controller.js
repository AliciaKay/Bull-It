myApp.controller('AddItemController', function (ItemsService, $location) {
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
        vm.date = '';
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
        swal({
            title: 'Added to Your Events',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function () {
            ItemsService.addEventToDB(eventToSend);
            vm.clearAllInputs();
            $location.path('/today');
        });
    };


    vm.addTask = function () {
        var taskToSend = {
            title: vm.title,
            details: vm.details,
            priority: parseInt(vm.priority),
            due: new Date(vm.due),
            pomos: vm.pomos
        };
        console.log('in add controller addTask function', taskToSend);
        swal({
            title: 'Added to Your Tasks',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function () {
            ItemsService.addTaskToDB(taskToSend);
            vm.clearAllInputs();
            $location.path('/today');
        });
    };

    vm.addNote = function () {
        var noteToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.date)
        };
        console.log('in add controller addNote function', noteToSend);
        swal({
            title: 'Added to Your Notes',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function () {
            ItemsService.addNoteToDB(noteToSend)
            vm.clearAllInputs();
            $location.path('/today');
        });
    };
});