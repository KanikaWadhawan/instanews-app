$(function(){

$('#select-menu').on('change', function() {
    const selected = $(this).val();
    if (selected !== '') {
      console.log('The value you picked is: ' + selected);
      loadArticles(selected);
    }
  });

  function loadArticles(selected){

    $.ajax({
      method: 'get',
      url:'https://api.nytimes.com/svc/topstories/v2/'+selected+'.json?api-key=aH4FAhLkiG9ICtGxYuBVuGhjQviN4Geb'
    }).done(function(data){
      console.log(data.results);
      const results = data.results;
      //append data
      // try template strings``
      //$.each(results, function(index,value){
      //append an article template `<article><p>${abstract}</p></article>
     // })
      
    }).fail().always();

  }
});//end of document ready