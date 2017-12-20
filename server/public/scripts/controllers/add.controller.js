myApp.controller('AddItemController', function (UserService, $location) {
    console.log('in addcontroller');

    var vm = this;
    vm.todaysDate = UserService.getToday;

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
            location: vm.eventLocation,
            userId: UserService.userObject.userId
        };
        console.log('in add controller addEvent function', eventToSend);
        swal({
            title: 'Added to Your Events',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function (res) {
            UserService.addEventToDB(eventToSend);
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
            pomos: vm.pomos,
            userId: UserService.userObject.userId
        };
        console.log('in add controller addTask function', taskToSend);
        swal({
            title: 'Added to Your Tasks',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function (res) {
            UserService.addTaskToDB(taskToSend);
            vm.clearAllInputs();
            $location.path('/today');
        });
    };

    vm.addNote = function () {
        var noteToSend = {
            title: vm.title,
            details: vm.details,
            date: new Date(vm.date),
            userId: UserService.userObject.userId
        };
        console.log('in add controller addNote function', noteToSend);
        swal({
            title: 'Added to Your Notes',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        }).then(function (res) {
            UserService.addNoteToDB(noteToSend);
            vm.clearAllInputs();
            $location.path('/today');
        });
    };
});