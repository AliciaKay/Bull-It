myApp.factory('UserService', function($http, $location){
    console.log('UserService Loaded');


    var userObject = {};
  
    return {

        getToday: function() {
          return new Date();
        },
        
        // // not static!!!! 
        // // dynamic data MUST BE IN AN OBJECT
      
        eventListObj: { event: [] },
        taskListObj: { task: [] },
        noteListObj: { note: [] },
        eventsToday: { events: [] },
        tasksToday: { tasks: [] },
        notesToday: { notes: [] },
        eventToEdit: {id: ''},
        taskToEdit: {id: ''},
        noteToEdit: {id: ''},
      
        addEventToDB: function (eventListObject) {
          return $http({
            method: 'POST',
            url: '/addEvent',
            data: eventListObject
          }).then(function (response) {
            console.log('added to events');
            });
          },
      
        addTaskToDB: function (taskListObject) {
          return $http({
            method: 'POST',
            url: '/addTask',
            data: taskListObject
          }).then(function (response) {
            getTodaysTasksFromDB();
          });
        },
      
        addNoteToDB: function (noteListObject) {
          return $http({
            method: 'POST',
            url: '/addNote',
            data: noteListObject
          }).then(function (response) {
            getTodaysNotesFromDB();
          });
        },
      
        removeTask: function (taskId) {
          console.log('task id:', taskId);
          return $http({
            method: 'DELETE',
            url: '/getTodaysTasks/' + taskId,
          }).then(function (response) {
            getTodaysTasksFromDB();
          });
        },
      
        removeNote: function (noteId) {
          console.log('note id:', noteId);
          return $http({
            method: 'DELETE',
            url: '/getTodaysNotes/' + noteId,
          }).then(function (response) {
            getTodaysNotesFromDB();
          });
        },
      
        removeEvent: function (eventId) {
          console.log('event id:', eventId);
          return $http({
            method: 'DELETE',
            url: '/getTodaysEvents/' + eventId,
          }).then(function (response) {
            getTodaysEventsFromDB();
          });
        },
      
        getTodaysEventsFromDB: function () {
          return $http.get('/getTodaysEvents').then(function (response) {
            console.log('in getTodaysEventsFromDB in the service', response.data)
            eventsToday.events = response.data;
          });
        },
      
        getTodaysTasksFromDB: function () {
          return $http.get('/getTodaysTasks').then(function (response) {
            console.log('in getTodaysTasksFromDB in the service', response.data)
            tasksToday.tasks = response.data;
          });
        },
      
        getTodaysNotesFromDB: function () {
          return $http.get('/getTodaysNotes').then(function (response) {
            console.log('in getTodaysNotesFromDB in the service', response.data)
            notesToday.notes = response.data;
          });
        },
      
        editEvent: function (id, event) {
          return $http({
            method: 'PUT',
            url: '/getTodaysEvents/' + id,
            data: event
          }).then(function (response) {
            getTodaysEventsFromDB();
          });
        },
      
        editTask: function (id, task) {
          return $http({
            method: 'PUT',
            url: '/getTodaysTasks/' + id,
            data: task
          }).then(function (response) {
            getTodaysTasksFromDB();
          })
        },
      
        editNote: function (id, note) {
          return $http({
            method: 'PUT',
            url: '/getTodaysNotes/' + id,
            data: note
          }).then(function (response) {
            console.log('got to the editNote put in the service...');
            getTodaysNotesFromDB();
          })
        },
      
        getThisWeeksEventsFromDB: function () {
          return $http.get('/getThisWeeksEvents').then(function (response) {
            console.log('in getThisWeeksEventsFromDB in the service', response.data)
            eventsToday.events = response.data;
          });
        },
      
        getThisWeeksTasksFromDB: function () {
          return $http.get('/getThisWeeksTasks').then(function (response) {
            console.log('in getThisWeeksTasksFromDB in the service', response.data)
            tasksToday.tasks = response.data;
          });
        },
      
        getThisWeeksNotesFromDB : function () {
          return $http.get('/getThisWeeksNotes').then(function (response) {
            console.log('in getThisWeeksNotesFromDB in the service', response.data)
            notesToday.notes = response.data;
          });
        },

      userObject : userObject,
  
      getuser : function(){
        console.log('UserService -- getuser');
        $http.get('/user').then(function(response) {
            if(response.data.username) {
                // user has a curret session on the server
                userObject.userName = response.data.username;
                userObject.userId = response.data.userId;
                console.log('UserService -- getuser -- User Data: ', userObject.userName);
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/home");
            }
        },function(response){
          console.log('UserService -- getuser -- failure: ', response);
          $location.path("/home");
        });
      },
  
      logout : function() {
        console.log('UserService -- logout');
        $http.get('/user/logout').then(function(response) {
          console.log('UserService -- logout -- logged out');
          $location.path("/home");
        });
      }
    };

    
  });