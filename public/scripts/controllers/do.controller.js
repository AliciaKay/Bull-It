myApp.controller('DoModeController', function (ItemsService, $location, $interval) {
    console.log('in DoModeController');

    var vm = this;

    vm.fillerIncrement = 300/((seconds*60) * 60);
    /*
      fillerIncrement variable stores the value by which fillerHeight should increase.
  */
    
    vm.fillerHeight = 0; 

    vm.taskId = ItemsService.taskToEdit.id;

    vm.taskItem = ItemsService.tasksToday.tasks.find(function (task) {
        if (task.id === vm.taskId) {
            console.log('vm.taskItem: ', task);
            return task;
        }
    });

    vm.startingPomos = vm.taskItem.pomos;
    vm.completedpomos = vm.taskItem.completedpomos;
    vm.pomoSeries = vm.startingPomos - vm.completedpomos;

    vm.completeTask = function() {
        vm.taskItem.completed = true;
        vm.submitTaskEdit();
        $location.path('/today');
    };

    vm.goToEditTask = function (id) {
        ItemsService.taskToEdit.id = id;
        console.log('edit task', id);
        $location.path('/edit');
    };

    vm.completeTaskAlert = function(){
        new swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, mark as complete!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function () {
            new swal(
                'Complete!',
                'Your task has been completed.',
                'success',
                vm.taskItem.completed = true,
                vm.submitTaskEdit(),
                $location.path('/today'),
        )}, function (dismiss) {
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

    vm.workTime = 25;
    vm.restTime = 5;
    vm.timerCountdown = vm.workTime;
    vm.workRest = 'work';

    var seconds = vm.timerCountdown * 60;
    var timerRun = false;

    vm.timerCountdown = toTimerOutput(seconds);

    // Changes the timer settings
    vm.changeTime = function (status, change) {
        if (status == 'work') {
            vm.workTime += change;
            if (vm.workTime <= 0) {
                vm.workTime = 1;
            }
            seconds = vm.workTime * 60;
            vm.timerCountdown = toTimerOutput(seconds)
        } else {
            vm.restTime += change;
            if (vm.restTime < 0) {
                vm.restTime = 0;
            }
        }
    };

    // Write timer in a readable format
    function toTimerOutput(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;

        return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }

    vm.toggleTimer = function () {
        if (!timerRun) {
            if (vm.workRest === 'work') {
                vm.current = vm.workTime;
            } else {
                vm.current = vm.breakTime;
            }
            reTimer();
            timerRun = $interval(reTimer, 1000);
        } else {
            $interval.cancel(timerRun);
            timerRun = false;
        }
    }

    vm.reset = function () {
        vm.workRest = 'work';
        $interval.cancel(timerRun);
        timerRun = false;
        seconds = 60 * vm.workTime;
        vm.timerCountdown = toTimerOutput(seconds);
        $('.rest-time').removeClass('active-timer');
        $('.work-time').removeClass('active-timer');
        vm.fillerIncrement = 300/(60 * vm.workTime);
        vm.fillerHeight = 0;
    }

    function reTimer() {
        seconds--;

        if (vm.workRest === 'rest') {
            $('.work-time').removeClass('active-timer');
            $('.rest-time').addClass('active-timer');
            vm.fillerIncrement = 300/(60 * vm.restTime);
        } else {
            $('.work-time').addClass('active-timer');
            $('.rest-time').removeClass('active-timer');
            vm.fillerIncrement = 300/(60 * vm.workTime);
        }
        vm.fillerHeight += vm.fillerIncrement;
        if (seconds < 0) {
            if (vm.workRest === 'work') {
                vm.completedpomos++;
                vm.fillerHeight = 0;
                if (vm.completedpomos < vm.startingPomos) {
                    vm.submitTaskEdit();
                    vm.workRest = 'rest';
                    seconds = 60 * vm.restTime;
                    
                    vm.timerCountdown = toTimerOutput(seconds);
                    new swal({
                        title: 'Break Time!',
                        width: 600,
                        padding: 100,
                        background: '#fff url(assets/page.JPG)'
                    });
                } else {
                    vm.completedpomos = vm.startingPomos;
                    $interval.cancel(timerRun);
                    timerRun = false;
                    vm.completeTask();
                };
            } else {
                vm.workRest = 'work';
                seconds = 60 * vm.workTime;
                vm.timerCountdown = toTimerOutput(seconds);
                vm.fillerHeight = 0;
                new swal({
                    title: 'Work Time!',
                    width: 600,
                    padding: 100,
                    background: '#fff url(assets/page.JPG)'
                });
            }
        } else {
            vm.timerCountdown = toTimerOutput(seconds);

        }
    };

    vm.submitTaskEdit = function () { 
        console.log('got to submitTaskEdit function')
        var title = vm.title;
        var details = vm.details;
        var priority = vm.priority;
        var due = vm.due;
        var pomos = vm.pomos;
        var completedpomos = vm.completedpomos;
        var completed = vm.completed;
        var task = {};
        if (title) {
            task.title = vm.title;
        } else {
            task.title = vm.taskItem.title;
        };
        if (details) {
            task.details = vm.details;
        } else {
            task.details = vm.taskItem.details;
        };
        if (priority) {
            task.priority = vm.priority;
        } else {
            task.priority = vm.taskItem.priority;
        };
        if (due) {
            task.due = vm.due;
        } else {
            task.due = vm.taskItem.due;
        };
        if (pomos) {
            task.pomos = vm.pomos;
        } else {
            task.pomos = vm.taskItem.pomos;
        };
        if (completedpomos) {
            task.completedpomos = vm.completedpomos;
        } else {
            task.completedpomos = vm.taskItem.completedpomos;
        };
        if (completed) {
            task.completed = vm.completed;
        } else {   
            task.completed = vm.taskItem.completed;
        };
        console.log("task:", task);
        ItemsService.editTask(vm.taskId, task);
    }
});

