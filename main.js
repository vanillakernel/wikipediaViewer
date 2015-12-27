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
    document.getElementById('storyContainer').innerHTML += "<div class='well story col-sm-4'><div class='storyText'><b>" + title  + "</b> <a href='"+link+"'>"+ description+ " </a> </div></div>";
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
});
