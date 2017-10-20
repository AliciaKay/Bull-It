myApp.service('ItemsService', function ($http) {
    console.log('in itemsService');

    var self = this;
    // // not static!!!! 
    // // dynamic data MUST BE IN AN OBJECT

    self.eventListObj = {event: []};
    self.taskListObj = {task: []};
    self.noteListObj = {note: []};
    self.eventsToday = {events: []};
    self.tasksToday = {tasks: []};
    self.notesToday = {notes: []};

  self.addEventToDB = function (eventListObject) {
    $http({
      method: 'POST',
      url: '/addEvent',
      data: eventListObject
    }).then(function() {
      // self.getEventsFromDB();
    })
  }

  // self.getEventsFromDB = function () {
  //   $http.get('/addEvent').then(function (response) {
  //     self.eventListObject = response.data;
  //   });
  // }

  self.addTaskToDB = function (taskListObject) {
    $http({
      method: 'POST',
      url: '/addTask',
      data: taskListObject
    }).then(function() {
      // self.getTasksFromDB();
    })
  }

  // self.getTasksFromDB = function () {
  //   $http.get('/addTask').then(function (response) {
  //     self.taskListObject = response.data;
  //   });
  // }

  self.addNoteToDB = function (noteListObject) {
    $http({
      method: 'POST',
      url: '/addNote',
      data: noteListObject
    }).then(function() {
      // self.getNotesFromDB();
    })
  }

  // self.getNotesFromDB = function () {
  //   $http.get('/addNote').then(function (response) {
  //     self.noteListObject = response.data;
  //   });
  // }

  self.getTodaysEventsFromDB = function () {
    $http.get('/getTodaysEvents').then(function (response) {
      console.log('in getTodaysEventsFromDB in the service', response.data)
      self.eventsToday.events = response.data;
    });
  }

  self.getTodaysTasksFromDB = function () {
    $http.get('/getTodaysTasks').then(function (response) {
      console.log('in getTodaysTasksFromDB in the service', response.data)
      self.tasksToday.tasks = response.data;
    });
  }

  self.getTodaysNotesFromDB = function () {
    $http.get('/getTodaysNotes').then(function (response) {
      console.log('in getTodaysNotesFromDB in the service', response.data)
      self.notesToday.notes = response.data;
    });
  }

});