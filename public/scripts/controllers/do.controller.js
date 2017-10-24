myApp.controller('DoModeController', function (ItemsService, $location) {
    console.log('in DoModeController');
    var vm = this;

    var app = angular.module("pomodoroApp", []);
    /* Define a module named pomodoroApp*/
    
    /* Defind the angular component*/
    app.component('pomodoroComp', {
      bindings: {},
      templateUrl: '/componentGrid.html',
      controller : ['$interval',function(interval){
     
        var self = this;
        self.started = false;
      /* 	
      started variable stores the state of the timer. If it is true, it means that some task (work, short break, long break) is going on with pomodoro timer. If it is false, it means that the pomodoro is not yet started or it is stopped (by clicking stop button)
     */
      
      self.minutes = 25;
      /*
        minutes variable stores current minute which is displayed in the pomodoro.	
    */
      
      self.seconds = 0;
      /*
        seconds variable stores current second which is displayed in the pomodoro.
    */
      
      self.fillerIncrement = 200/(self.minutes*60);
      /*
        fillerIncrement variable stores the value by which fillerHeight should increase.
    */
      
      self.fillerHeight = 0; 
      /*
        fillerHeight variable stores the height of the background filler. Initially it is set to 0. As soon as a pomodoro task starts, its height starts increasing (by a value which is stored in fillerIncrement variable) and it keeps increasing till that particular task ends. On click of stop button, it is again set to 0.
    
    */
    
      
      /*
      resetVariables function will be called for each of the actions (work, Short Break, Long Break, Stop) to set the value of variables to values corresponding to that particular action
      */
      
    self.resetVariables = function(mins, secs, started){
        self.minutes = mins;
        self.seconds = secs;
        self.started = started;
        self.fillerIncrement = 200/(self.minutes*60);
        self.fillerHeight = 0;
    }
    
    /* handler to be called when user clicks ‘Work’ button */
    self.startWork = function(){
        self.resetVariables(25, 0, true);
    };
    
    /* handler to be called when user clicks ‘Short Break’ button */
    self.startShortBreak = function(){
        self.resetVariables(5, 0, true);
    };
    
    /* handler to be called when user clicks ‘Long Break’ button */
    self.startLongBreak = function(){
        self.resetVariables(15, 0, true);
    };
    
    /* handler to be called when user clicks ‘Stop’ button */
    self.stopTimer = function(){
        self.resetVariables(25, 0, false);
    };
    
    self.timerComplete = function(){
        self.started = false;
    };
    
    /*
     intervalCallback function is called each second, updates the values of minutes and seconds variables and reflect the updates in timer
     */
    self.intervalCallback = function(){ 
      if(!self.started) return false;
        if(self.seconds == 0) {
            if(self.minutes == 0) {
                self.timerComplete();
                return;
            }
            self.seconds = 59;
            self.minutes--;
        } else {
            self.seconds--;
        }
      
        self.fillerHeight += self.fillerIncrement;
    };
    
    /* 
     toDoubleDigit function converts a number to double digit. If num is single digit (0-9), it is prepended with a ‘0’ and resulting string is returned. If num is double digit, it is returned as such. This function is needed as we want to display ’05’ instead of ‘5’ in timer 
     */
    self.toDoubleDigit = function(num){
        return num < 10 ? '0' + parseInt(num,10) : num;
    };
    
    
    /*
     Init method initializes the timer using $interval function such that a callback function (intervalCallback) is called after every second
     */
    
    self.$onInit = function(){
        self.interval = interval( self.intervalCallback, 1000);
    /*
     $onInit is automatically called when component is initialized. interval variable stores the reference id of the currently running interval. If we need to clear the interval, we will need this variable. Although in the demo, we are not clearing the interval, it’s always a good idea to clear the interval at some point.
     */
    
    
      };
        
      }]
    });
});