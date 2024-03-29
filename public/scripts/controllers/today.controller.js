myApp.controller('TodayController', function (ItemsService, $location) {
    console.log('in today controller');
    var vm = this;

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

    vm.todaysDate = ItemsService.getToday;

    vm.events = ItemsService.eventsToday;
    vm.tasks = ItemsService.tasksToday;
    vm.notes = ItemsService.notesToday;

    ItemsService.getTodaysEventsFromDB();
    ItemsService.getTodaysTasksFromDB();
    ItemsService.getTodaysNotesFromDB();

    vm.cancelTask = function (id) {
        new swal({
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
            new swal(
                'Deleted!',
                'Your task has been deleted.',
                'success',
                ItemsService.removeTask(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                new swal(
                    'Cancelled',
                    'Your task is safe :)',
                    'error'
                )
            }
        })
    };

    vm.cancelNote = function (id) {
        new swal({
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
            new swal(
                'Deleted!',
                'Your note has been deleted.',
                'success',
                ItemsService.removeNote(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                new swal(
                    'Cancelled',
                    'Your note is safe :)',
                    'error'
                )
            }
        })
    };

    vm.cancelEvent = function (id) {
        new swal({
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
            new swal(
                'Deleted!',
                'Your event has been deleted.',
                'success',
                ItemsService.removeEvent(id)
            )
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                new swal(
                    'Cancelled',
                    'Your event is safe :)',
                    'error'
                )
            }
        })
    };


    vm.goToEditTask = function (id) {
        ItemsService.taskToEdit.id = id;
        console.log('edit task', id);
        $location.path('/edit');
    };

    vm.goToEditEvent = function (id) {
        ItemsService.eventToEdit.id = id;
        console.log('edit event', id);
        $location.path('/edit');
    };

    vm.goToEditNote = function (id) {
        ItemsService.noteToEdit.id = id;
        console.log('edit note', id);
        $location.path('/edit');
    };

    vm.goToDoTask = function (id, pomos) {
        ItemsService.taskToEdit.id = id;
        ItemsService.taskToEdit.pomos = pomos;
        $location.path('/do');
    }

    vm.cannotDoTask = function() {
        new swal({
            title: 'Once a task is completed, it cannot be timed again.',
            width: 600,
            padding: 100,
            background: '#fff url(assets/page.JPG)'
        })
    }


});
