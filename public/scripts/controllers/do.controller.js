myApp.controller('DoModeController', function (ItemsService, $location, $interval) {
    console.log('in DoModeController');

    var vm = this;

    vm.goToEditTask = function (id) {
        ItemsService.taskToEdit.id = id;
        console.log('edit task', id);
        $location.path('/edit');
    };

    vm.taskId = ItemsService.taskToDo.id;

    vm.taskItem = ItemsService.tasksToday.tasks.find(function (task) {
        if (task.id === vm.taskId) {
            console.log('vm.taskItem: ', task);
            return task;

        }
    });

    vm.pomoSeries = vm.taskItem.pomos;

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
        if (vm.pomoSeries < 1) {
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
                    alert("Break time!");
                    vm.workRest = 'rest';
                    seconds = 60 * vm.restTime;
                    vm.timerCountdown = toTimerOutput(seconds);
                } else {
                    vm.pomoSeries--;
                    alert("Back to work!")
                    vm.workRest = 'work';
                    seconds = 60 * vm.workTime;
                    vm.timerCountdown = toTimerOutput(seconds);
                }
            } else {
                vm.timerCountdown = toTimerOutput(seconds);
            }
        } else {
            swal({
                title: 'This Task is Out of Planned Pomodoros',
                width: 600,
                padding: 100,
                background: '#fff url(assets/page.JPG)'
            }).then(function (taskId) {
                vm.goToEditTask(taskId);
            });
        }
    }
});

