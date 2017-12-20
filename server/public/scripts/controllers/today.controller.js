myApp.controller('TodayController', function (UserService, $location) {
    console.log('in today controller');
    var vm = this;

    UserService.getuser();

    vm.getPomoNumber = function (num) {
        var array = [];
        for (var i = null; i < num; i++) {
            array.push(i);
        }
        return array;
    };

    vm.getDonePomoNumber = function (num) {
        var array = [];
        for (var i = null; i < num; i++) {
            array.push(i);
        }
        return array;
    };

    vm.todaysDate = UserService.getToday;

    vm.events = UserService.eventsToday;
    vm.tasks = UserService.tasksToday;
    vm.notes = UserService.notesToday;

    UserService.getTodaysEventsFromDB();
    UserService.getTodaysTasksFromDB();
    UserService.getTodaysNotesFromDB();
    

    vm.cancelTask = function (id) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            swal(
                'Deleted!',
                'Your task has been deleted.',
                'success',
                UserService.removeTask(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your task is safe :)',
                    'error'
                )
            }
        })
    };

    vm.cancelNote = function (id) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            swal(
                'Deleted!',
                'Your note has been deleted.',
                'success',
                UserService.removeNote(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your note is safe :)',
                    'error'
                )
            }
        })
    };

    vm.cancelEvent = function (id) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            swal(
                'Deleted!',
                'Your event has been deleted.',
                'success',
                UserService.removeEvent(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your event is safe :)',
                    'error'
                )
            }
        })
    };


    vm.goToEditTask = function (id) {
        UserService.taskToEdit.id = id;
        console.log('edit task', id);
        $location.path('/edit');
    };

    vm.goToEditEvent = function (id) {
        UserService.eventToEdit.id = id;
        console.log('edit event', id);
        $location.path('/edit');
    };

    vm.goToEditNote = function (id) {
        UserService.noteToEdit.id = id;
        console.log('edit note', id);
        $location.path('/edit');
    };

    vm.goToDoTask = function (id, pomos) {
        UserService.taskToEdit.id = id;
        UserService.taskToEdit.pomos = pomos;
        $location.path('/do');
    }

    vm.cannotDoTask = function() {
        swal({
            title: 'Once a task is completed, it cannot be timed again.',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        })
    }


});
