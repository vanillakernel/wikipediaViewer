///////////////////
//  Global Vars  // Keep to a minimum!!
///////////////////

// NO GLOBAL VARIABLES!!!


// Async function that gets the data...eventually
function getStreamData(){
  query="linux"
  $.ajax({
   url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+query+ '&limit=10&namespace=0&format=json',
   dataType: 'jsonp',
   success: function(data){
     console.log(data);
     updateHTML(data);
   }
 });
  return;
}

// Callback function that updates html when the async getJSON is complete.
function updateHTML(data){
  if(document.getElementById('storyContainer').innerHTML=="Please wait while the stories are populated."){
    document.getElementById('storyContainer').innerHTML="";
  }

 for (i in data[1]){
  if (data[i] !== null){
    var title= (data[1][i]);
    var description = (data[2][i]);
    var link = (data[3][i]);
    document.getElementById('storyContainer').innerHTML += "<div class='well result col-sm-8'><div class='resultTitle'><b><a href='"+link+"'>" + title  + "</a></b></div><div class='description'>"+ description+ "</div></div>";
  }

}
return "fell through";
}





///////////////////
// Doc Ready     //
///////////////////
// This is the main call.
// Make sure you load jQuery in your html doc FIRST!!
jQuery(document).ready(function($) {
   getStreamData();

  // Get that sweet autocomplete nectar. 
  $("#autocomplete").autocomplete({
   source: function(request, response) {
     $.ajax({
       url: "http://en.wikipedia.org/w/api.php",
       dataType: "jsonp",
       data: {
         'action': "opensearch",
         'format': "json",
         'search': request.term
       },
       success: function(data) {
                  response(data[1]);
                }
     });
   }
  });
  $( "#autocomplete" ).submit(function( event ) {
      alert( "Handler for .submit() called." );
        event.preventDefault();
  });
});
