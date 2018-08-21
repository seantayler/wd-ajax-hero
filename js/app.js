(function() {
  'use strict';

  let movies;

  const renderMovies = function(arr) {
    $('#listings').empty();

    for (const movie of arr) {
      fetch(`http://www.omdbapi.com/?i=${movie['imdbID']}&plot=full&apikey=8e7e3c3e`)
      // fetch(`http://img.omdbapi.com/?apikey=8e7e3c3e&`)
      .then(response => response.json())
      .then(data => {
        const $col = $('<div>').addClass('col s6');
        const $card = $('<div>').addClass('card hoverable');
        const $content = $('<div>').addClass('card-content center');
        const $title = $('<h6>').addClass('card-title truncate');

        $title.attr({
          'data-position': 'top',
          'data-tooltip': movie.Title
        });

        $title.tooltip({ delay: 50 }).text(movie.Title);

        const $poster = $('<img>').addClass('poster');

        $poster.attr({
          src: movie.Poster,
          alt: `${movie.Poster} Poster`
        });

        $content.append($title, $poster);
        $card.append($content);

        const $action = $('<div>').addClass('card-action center');
        const $plot = $('<a>');

        $plot.addClass('waves-effect waves-light btn modal-trigger');
        $plot.attr('href', `#${movie.imdbID}`);
        $plot.text('Plot Synopsis');

        $action.append($plot);
        $card.append($action);

        const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
        const $modalContent = $('<div>').addClass('modal-content');
        const $modalHeader = $('<h4>').text(movie.Title);
        const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
        const $modalText = $('<p>').text(data['Plot']);

        $modalContent.append($modalHeader, $movieYear, $modalText);
        $modal.append($modalContent);

        $col.append($card, $modal);

        $('#listings').append($col);

        $('.modal-trigger').leanModal();
      });
    }
  };

  let search = document.getElementById('search');
  let submit = document.getElementById('submit');
  let listings = document.getElementById('listings');

  let getResults = function(e) {
    e.preventDefault();
    if (search.value !== '') {
      fetch(`http://www.omdbapi.com/?s=${search.value}&apikey=8e7e3c3e`)
      // fetch(`http://img.omdbapi.com/?apikey=8e7e3c3e&`)
      .then(response => response.json())
      .then(data => {
        movies = data.Search
        renderMovies(movies)
      });
    }
    search.value = '';
  }
  submit.addEventListener('click', getResults);

})();
