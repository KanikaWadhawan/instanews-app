$(function () {
  //const resLoading = "<li class='loading-msg'>Loading...</li>";
  const resFail = "<li>Sorry, something went terribly wrong</li>";
  const $loader = $(".loader-container");
  const $loadTime = 1000;

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
    // $selectedList.append(resLoading);
    $loader.fadeIn($loadTime);

    $.ajax({
      method: 'get',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=aH4FAhLkiG9ICtGxYuBVuGhjQviN4Geb'
    }).done(function (data) {
      // console.log(data.results);
      $loader.fadeOut($loadTime);
      const results = data.results;

      const filteredResults = results.filter(function (article) {
        return article.multimedia.length;
      }).slice(0, 12);



      console.log("filtered", filteredResults);

      $.each(filteredResults, function (index, value) {
        console.log(value);
        $selectedList.append(`
              <li class="result-data">
              <a href ="${value.url}" target="_blank" >
      <div class="bckg-img" style="background-image: url(${value.multimedia[4].url})">
        
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
      // $('.loading-msg').remove();
     // $loader.fadeOut($loadTime);
    });
  }

});//end of document ready