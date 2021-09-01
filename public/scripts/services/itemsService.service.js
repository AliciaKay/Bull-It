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
  self.eventToEdit = {id: ''};
  self.taskToEdit = {id: ''};
  self.noteToEdit = {id: ''};

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
       self.getTodaysTasksFromDB();
    });
  };

  self.addNoteToDB = function (noteListObject) {
    $http({
      method: 'POST',
      url: '/addNote',
      data: noteListObject
    }).then(function () {
       self.getTodaysNotesFromDB();
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

  self.editEvent = function (id, event) {
    $http({
      method: 'PUT',
      url: '/getTodaysEvents/' + id,
      data: event
    }).then(function (res) {
      self.getTodaysEventsFromDB();
    })
  }

  self.editTask = function (id, task) {
    $http({
      method: 'PUT',
      url: '/getTodaysTasks/' + id,
      data: task
    }).then(function (res) {
      self.getTodaysTasksFromDB();
    })
  }

  self.editNote = function (id, note) {
    $http({
      method: 'PUT',
      url: '/getTodaysNotes/' + id,
      data: note
    }).then(function (res) {
      console.log('got to the editNote put in the service...');
      self.getTodaysNotesFromDB();
    })
  }

  self.getThisWeeksEventsFromDB = function () {
    $http.get('/getThisWeeksEvents').then(function (response) {
      console.log('in getThisWeeksEventsFromDB in the service', response.data)
      self.eventsToday.events = response.data;
    });
  };

  self.getThisWeeksTasksFromDB = function () {
    $http.get('/getThisWeeksTasks').then(function (response) {
      console.log('in getThisWeeksTasksFromDB in the service', response.data)
      self.tasksToday.tasks = response.data;
    });
  };

  self.getThisWeeksNotesFromDB = function () {
    $http.get('/getThisWeeksNotes').then(function (response) {
      console.log('in getThisWeeksNotesFromDB in the service', response.data)
      self.notesToday.notes = response.data;
    });
  };
});