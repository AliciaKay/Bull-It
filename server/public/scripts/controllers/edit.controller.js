myApp.controller('EditItemController', function (UserService, $location) {
    console.log('in editcontroller');

    var vm = this;
    vm.todaysDate = UserService.getToday;
    vm.eventId = UserService.eventToEdit.id;
    vm.taskId = UserService.taskToEdit.id;
    vm.noteId = UserService.noteToEdit.id;

    vm.eventItem = UserService.eventsToday.events.find(function(event) {
        if (event.id === vm.eventId) {
            return event;
        }
    });

    vm.taskItem = UserService.tasksToday.tasks.find(function(task) {
        if (task.id === vm.taskId) {
            return task;
        }
    });

    vm.noteItem = UserService.notesToday.notes.find(function(note) {
        if (note.id === vm.noteId) {
            return note;
        }
    });

    vm.submitEventEdit = function () { 
        var title = vm.title;
        var details = vm.details;
        var date = vm.date;
        var time = vm.time;
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
        UserService.editEvent(vm.eventId, event);
        $location.path('/today');
    }

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
        UserService.editTask(vm.taskId, task);
        $location.path('/today');
    }

    vm.submitNoteEdit = function() {
        console.log('got to submitNoteEdit function')
        var title = vm.title;
        var details = vm.details;
        var date = vm.date;
        var note = {};
        if (title) {
            note.title = vm.title;
        } else {
            note.title = vm.noteItem.title;
        };
        if (details) {
            note.details = vm.details;
        } else {
            note.details = vm.noteItem.details;
        };
        if (date) {
            note.date = vm.date;
        } else {
            note.date = vm.noteItem.date;
        };
        console.log("note:", note);
        UserService.editNote(vm.noteId, note);
        $location.path('/today');
    }
});