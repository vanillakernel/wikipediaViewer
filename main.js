// NO GLOBAL VARIABLES!!!



// Async function that gets the data...eventually
function getRandom(){

  $.ajax({
   url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&generator=random&exintro&grnnamespace=0&rnredirect=true&format=json',
   dataType: 'jsonp',
   success: function(data){
   console.log(data);
   var title = "";
   var extract = "";
   var randObject = data['query']['pages'];
   for (page in randObject){
    title = randObject[page]['title'];
    extract = randObject[page]['extract'];
   }
   document.getElementById('storyContainer').innerHTML="";
   document.getElementById('storyContainer').innerHTML += "<div class='result col-sm-8'><div class='resultTitle'><b>" + title  + "</b></div><div class='description'>"+ extract + "</div></div>";     
       console.log(extract);
   }
 });
  return;
}


// Callback function that updates html when the async getJSON is complete.
function updateHTML(data){
 document.getElementById('storyContainer').innerHTML="";
 for (i in data[1]){
  if (data[i] !== null){
    var title= (data[1][i]);
    var description = (data[2][i]);
    var link = (data[3][i]);
     console.log(data);
    document.getElementById('storyContainer').innerHTML += "<div class='result col-sm-8'><div class='resultTitle'><b><a href='"+link+"'>" + title  + "</a></b></div><div class='description'>"+ description+ "</div></div>";
  }
}
return false;
}

///////////////////
// Doc Ready     //
///////////////////
// This is the main call.
// Make sure you load jQuery in your html doc FIRST!!
jQuery(document).ready(function($) {

  // Get that sweet autocomplete nectar. 
  $("#autocomplete").autocomplete({
   source: function(request, response) {
     $.ajax({
       url: "http://en.wikipedia.org/w/api.php",
       dataType: "jsonp",
       data: {
         'action': "opensearch",
         'search': request.term
       },
       success: function(data) {
                  console.log(data);
                  updateHTML(data);
                }
     });
   }
  });
});
