myApp.service('ItemsService', function ($http) {
  console.log('in itemsService');

  var self = this;
  self.getToday = new Date();
  // // not static!!!! 
  // // dynamic data MUST BE IN AN OBJECT

  self.eventListObj = { event: [] };
  self.taskListObj = { task: [] };
  self.noteListObj = { note: [] };
  self.eventsToday = { events: [] };
  self.tasksToday = { tasks: [] };
  self.notesToday = { notes: [] };

  self.addEventToDB = function (eventListObject) {
    $http({
      method: 'POST',
      url: '/addEvent',
      data: eventListObject
    }).then(function () {
      console.log('added to events');
      });
    };

  self.addTaskToDB = function (taskListObject) {
    $http({
      method: 'POST',
      url: '/addTask',
      data: taskListObject
    }).then(function () {
      // self.getTasksFromDB();
    });
  };

  self.addNoteToDB = function (noteListObject) {
    $http({
      method: 'POST',
      url: '/addNote',
      data: noteListObject
    }).then(function () {
      // self.getNotesFromDB();
    });
  };

  self.removeTask = function (taskId) {
    console.log('task id:', taskId);
    $http({
      method: 'DELETE',
      url: '/getTodaysTasks/' + taskId,
    }).then(function (res) {
      self.getTodaysTasksFromDB();
    });
  };

  self.removeNote = function (noteId) {
    console.log('note id:', noteId);
    $http({
      method: 'DELETE',
      url: '/getTodaysNotes/' + noteId,
    }).then(function (res) {
      self.getTodaysNotesFromDB();
    });
  };

  self.removeEvent = function (eventId) {
    console.log('event id:', eventId);
    $http({
      method: 'DELETE',
      url: '/getTodaysEvents/' + eventId,
    }).then(function (res) {
      self.getTodaysEventsFromDB();
    });
  };

  self.getTodaysEventsFromDB = function () {
    $http.get('/getTodaysEvents').then(function (response) {
      console.log('in getTodaysEventsFromDB in the service', response.data)
      self.eventsToday.events = response.data;
    });
  };

  self.getTodaysTasksFromDB = function () {
    $http.get('/getTodaysTasks').then(function (response) {
      console.log('in getTodaysTasksFromDB in the service', response.data)
      self.tasksToday.tasks = response.data;
    });
  };

  self.getTodaysNotesFromDB = function () {
    $http.get('/getTodaysNotes').then(function (response) {
      console.log('in getTodaysNotesFromDB in the service', response.data)
      self.notesToday.notes = response.data;
    });
  };

  self.editEvent = function (event) {
    var id = event.id;
    $http({
      method: 'PUT',
      url: '/getTodaysEvents/' + id,
      data: {
        title: event.title,
        details: event.details,
        date: event.date,
        time: event.time,
        location: event.location
      }
    }).then(function (res) {
      vm.getTodaysEventsFromDB();
    })
  }

  self.editTask = function (task) {
    var id = task.id;
    $http({
      method: 'PUT',
      url: '/getTodaysTasks/' + id,
      data: {
        title: task.title,
        details: task.details,
        priority: task.priority,
        due: task.due,
        pomos: task.pomos
      }
    }).then(function (res) {
      vm.getTodaysTasksFromDB();
    })
  }
});