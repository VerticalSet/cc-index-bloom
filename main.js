$(function(){
  var fileContent = null;
  $("#ccfile").fileReaderJS({
    dragClass: "drag",
    accept: false,
    readAsMap: {
        'image/*': 'DataURL',
        'text/*' : 'Text'
    },
    readAsDefault: 'Text',
    on: {
      beforestart: function(e, file) {
        // return false if you want to skip this file

      },
      loadstart: function(e, file) {
        // Native ProgressEvent

      },
      progress: function(e, file) {
        // Native ProgressEvent

      },
      load: function(e, file) {
        // Native ProgressEvent

      },
      error: function(e, file) {
        // Native ProgressEvent

      },
      loadend: function(e, file) {
        // Native ProgressEvent
        var fileContent = e.target.result;
        // var regExp = new RegExp("^http://api.jquery.com/(?:jQuery\.)?([^\/]+)/$");
        // var urls = $.map(fileContent.split("\n"), function(line){
        //   if ( !line ) return;
        //   var url=null;
        //   try
        //   {
        //     url = JSON.parse(line).url;
        //   }
        //   catch(err)
        //   {
        //     console.log("could not parse line : '" + line + "'")
        //     return null;
        //   }
        //   var matchData = url.match(regExp);
        //   if ( matchData && matchData.length > 0 ) {
        //     entity = matchData[1];
        //     return entity;
        //   }
        //   else {
        //     return null;
        //   }
        // });
        // console.log(urls);

        var $scope = angular.element($("#mainForm").get(0)).scope()
        $scope.$apply(function(){
          var urls = $.map(fileContent.split("\n"), function(line){
            if ( !line ) return;
            var url=null;
            try
            {
              url = JSON.parse(line).url;
            }
            catch(err)
            {
              console.log("could not parse line : '" + line + "'")
              return null;
            }
            return url;
          });
          $scope.urls =  urls;
          $scope.extractSample();
        });
      },
      abort: function(e, file) {
        // Native ProgressEvent
      },
      skip: function(e, file) {
        // Called when a file is skipped.  This happens when:
        //  1) A file doesn't match the accept option
        //  2) false is returned in the beforestart callback
      },
      groupstart: function(group) {

      },
      groupend: function(group) {

      }
    }
  });
});


var MainCtrl = function($scope){

  $scope.regexp = null;

  $scope.urls = [];
  $scope.sampleEntities = ["dd"];

  $scope.options = {
    strip: true,
    urlDecode: true
  };

  $scope.extractSample = function(){
    var sampleEntities = [];

    if ( $scope.regexp ) {
      var regExp = new RegExp($scope.regexp);

      for ( var i = 0 ; i < $scope.urls.length && i < 30 ; i++ ) {
        var url = $scope.urls[i];
        var matchData = url.match(regExp);
        if ( matchData && matchData.length > 0 && (entity = matchData[1]) ) {
          if ( $scope.options.strip ) {
            entity = entity.trim();
          }
          if ( $scope.options.urlDecode ) {
            entity = decodeURIComponent(entity);
          }
          sampleEntities.push(entity);
        }
      }

      if ( sampleEntities.length > 0 ) {
        $scope.sampleEntities = sampleEntities.join("\n") + "\n.....";
      }
      else {
        $scope.sampleEntities = "No entities found. Check Regular Expression.\nURLs are:\n" + $scope.urls.slice(0, 30).join("\n");
      }
    }
    else {
      $scope.sampleEntities = "No entities found. Check Regular Expression.\nURLs are:\n" + $scope.urls.slice(0, 30).join("\n");
    }
  };

  $scope.submit = function(){
    alert("Submitted");
  };
};