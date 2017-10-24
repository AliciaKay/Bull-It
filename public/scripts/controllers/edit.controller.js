myApp.controller('EditItemController', function (ItemsService) {
    console.log('in editcontroller');

    var vm = this;
    vm.todaysDate = ItemsService.getToday;
    vm.eventId = ItemsService.eventToEdit.id;
    vm.taskId = ItemsService.taskToEdit.id;

    vm.eventItem = ItemsService.eventsToday.events.find(function(event) {
        if (event.id === vm.eventId) {
            return event;
        }
    });

    vm.taskItem = ItemsService.tasksToday.tasks.find(function(task) {
        if (task.id === vm.taskId) {
            return task;
        }
    });

    vm.submitEventEdit = function () { 
        var title = vm.title;
        var details = vm.details;
        var date = vm.eventDate;
        var time = vm.eventTime;
        var location = vm.location;
        console.log("submitEdit:", title, details, date, time, location);
        var event = {};
        if (title) {
            event.title = vm.title;
        } else {
            event.title = vm.eventItem.title;
        };
        if (details) {
            event.details = vm.details;
        } else {
            event.details = vm.eventItem.details;
        };
        if (date) {
            event.date = vm.date;
        } else {
            event.date = vm.eventItem.date;
        };
        if (time) {
            event.time = vm.time;
        } else {
            event.time = vm.eventItem.time;
        };
        if (location) {
            event.location = vm.location;
        } else {
            event.location = vm.eventItem.location;
        }
        console.log("event:", event);
        ItemsService.editEvent(vm.eventId, event);
    }

    vm.submitTaskEdit = function () { 
        console.log('got to submitTaskEdit function')
        var title = vm.title;
        var details = vm.details;
        var priority = vm.priority;
        var due = vm.due;
        var pomos = vm.pomos;
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
        }
        console.log("task:", task);
        ItemsService.editTask(vm.taskId, task);
    }
});