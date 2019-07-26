$(function () {
  const resLoading = "<li class='loading-msg'>Loading...</li>";
  const resFail = "<li>Sorry, something went terribly wrong</li>";


  $('#select-menu').on('change', function (e) {
    e.preventDefault();
    const selected = $(this).val();
    if (selected !== '') {
      console.log('The value you picked is: ' + selected);
      loadArticles(selected);
    }
  });

  function loadArticles(selected) {
    const $selectedList = $(".selected-list");
   
    $selectedList.html("");
    $selectedList.append(resLoading);

    $.ajax({
      method: 'get',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=aH4FAhLkiG9ICtGxYuBVuGhjQviN4Geb'
    }).done(function (data) {
     // console.log(data.results);
      const results = data.results;

      const filteredResults = results.filter(function(article){
        return article.multimedia.length;
      }).slice(0, 12);



      console.log("filtered", filteredResults);

      $.each(filteredResults, function (index, value) {
          console.log(value);
         $selectedList.append(`
              <li class="result-data">
              <a href ="${value.url}" >
      <div class="bckg-img" style="background: url(${value.multimedia[4].url})">
        <p class="title">${value.title}</p>
        <p class="abstract">${value.abstract}</p>
        </div>
        </a>
      </li>
             ` )
      })
    }).fail(function () {
      $selectedList.append(resFail);
    }).always(function () {
      // $selectedList.html("");
     $('.loading-msg').remove();
    });
  }

});//end of document ready