myApp.service('ItemsService', function ($http) {
    console.log('in itemsService');

    var self = this;
    // // not static!!!! 
    // // dynamic data MUST BE IN AN OBJECT

    self.eventListObj = {event: []};
    self.taskListObj = {task: []};
    self.noteListObj = {note: []};

  self.addEventToDB = function (eventListObject) {
    $http({
      method: 'POST',
      url: '/addEvent',
      data: eventListObject
    }).then(function() {
      self.getEventsFromDB();
    })
  }

  self.getEventsFromDB = function () {
    $http.get('/addEvent').then(function (response) {
      self.eventListObject = response.data;
    });
  }

  self.addTaskToDB = function (taskListObject) {
    $http({
      method: 'POST',
      url: '/addTask',
      data: taskListObject
    }).then(function() {
      self.getTasksFromDB();
    })
  }

  self.getTasksFromDB = function () {
    $http.get('/addTask').then(function (response) {
      self.taskListObject = response.data;
    });
  }

  self.addNoteToDB = function (taskListObject) {
    $http({
      method: 'POST',
      url: '/addNote',
      data: taskListObject
    }).then(function() {
      self.getNotesFromDB();
    })
  }

  self.getNotesFromDB = function () {
    $http.get('/addNote').then(function (response) {
      self.noteListObject = response.data;
    });
  }
});