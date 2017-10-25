myApp.controller('DoModeController', function (ItemsService, $location, $interval) {
    console.log('in DoModeController');

    var vm = this;

    vm.taskId = ItemsService.taskToEdit.id;

    vm.taskItem = ItemsService.tasksToday.tasks.find(function (task) {
        if (task.id === vm.taskId) {
            console.log('vm.taskItem: ', task);
            return task;
        }
    });

    vm.startingPomos = vm.taskItem.pomos;
    vm.pomoSeries = vm.taskItem.pomos;
    vm.completedpomos = vm.taskItem.completedpomos;

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
    }

    function reTimer() {
        seconds--;
        if (vm.workRest === 'rest') {
            $('.work-time').removeClass('active-timer');
            $('.rest-time').addClass('active-timer');
        } else {
            $('.work-time').addClass('active-timer');
            $('.rest-time').removeClass('active-timer');
        }
        if (seconds < 0) {
            if (vm.workRest === 'work') {
                if (vm.pomoSeries > 1) {
                    vm.completedpomos++;
                    vm.pomoSeries--;
                    vm.submitTaskEdit();
                    alert("Break time!");
                    vm.workRest = 'rest';
                    seconds = 60 * vm.restTime;
                    vm.timerCountdown = toTimerOutput(seconds);
                } else {
                    vm.pomoSeries = 0;
                };
            } else {
                alert("Back to work!")
                vm.workRest = 'work';
                seconds = 60 * vm.workTime;
                vm.timerCountdown = toTimerOutput(seconds);
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

