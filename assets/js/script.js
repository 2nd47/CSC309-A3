/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

// Given a list of articles and their data, render them into HTML
function renderBasicArticles(articles) {
  var data = $.parseJSON(articles);
  var $result = $("<div>");
  $result.addClass('content-container');

  var article;
  // Iterate over all of the articles and collect any relevant data
  $.each(data, function(i, item) {
    var $article = $("<div>");
    $article.addClass('content');
    var $title = $("<p>");
    $title.append(item['title']).css('font-weight', 'bold');
    var $date = $("<p>");
    $date.append(item['published_date']).css('font-size', 'small');
    var $abstract = $("<p>");
    $abstract.append(item['abstract']);
    var $short_url = $("<a>");
    $short_url.append(item['short_url']).attr('href', item['short_url']);
    // Finally append all that data to the article object
    $article.append($title, $date, $abstract, $short_url);
    // And that to the final result
    $result.append($article);
  });

  $("#main").html($result);

  return $result;
}

// Given a list of tags and their occurrences, render them into html
function renderTags(tags) {
  var data = $.parseJSON(tags);
  var $result = $("<div>");
  $result.addClass('content-container');

  $title = $("<p>").append('Tag cloud (bigger means more frequent)')
    .addClass('bold')
  $result.append($title);

  // Set up various font size configurations
  var fontMin = 16;
  var fontMax = 32;

  // Set up the range of values needed to represent for our fonts
  var mostOccurrences = 1;
  var leastOccurrences = 1;
  var rangeOccurrences;

  // Just get the largest number of occurrences for any given tag
  $.each(data, function(tagName, tagValue) {
    if (tagValue > mostOccurrences) {
      mostOccurrences = tagValue;
    }
    // This generally shouldn't happen but if a tag was never used it would work
    else if (tagValue < leastOccurrences) {
      leastOccurrences = tagValue;
    }
  });

  // Get how many different states there should be between font sizes
  rangeOccurrences = mostOccurrences - leastOccurrences;
  // Our font increase corresponds to the range of font sizes and occurrences
  var fontIncr = (fontMax - fontMin) / rangeOccurrences;

  // Create a <p> container for all the tags and modify font-size by span style
  $tags = $("<p>").addClass('content')
    .css('text-align', 'center').css('margin-top', '0em');
  $.each(data, function(tagName, tagValue) {
    $newTag = $("<span>").addClass('cloud');
    $newTag.css('font-size', (tagValue - 1) * fontIncr + fontMin + 'pt').append(tagName);
    $tags.append($newTag);
  });

  $result.append($tags);
  $("#main").html($result);

  return $result;
}

// Given a list of authors, render them into HTML
function renderAuthors(authors) {
  var data = $.parseJSON(authors);
  var $result = $("<div>");
  $result.addClass('content-container');

  //Create a list of authors
  $authors = $("<p>").addClass('content');
  $title = $("<p>").append('All credited authors: ')
    .addClass('bold').css('margin-bottom', '1em').css('margin-top', '0em');
  $authors.append($title);

  // Loop over all authors and add their name to our new element
  $.each(data, function(authorName, occurrences) {
    $author = $("<p>")
    $author.append(authorName + ' - ' + occurrences).addClass('marginless');
    $authors.append($author);
  });

  // Append to our final result
  $result.append($authors);

  $("#main").html($result);
  return $result;
}

// Given a list of articles and their images, render them into HTML
function renderThumbnailArticles(articles) {
  var data = $.parseJSON(articles);
  var $result = $("<div>");
  $result.addClass('content-container').addClass('flex-row');

  // Iterate over all the articles and add them as thumbnails first
  $.each(data, function(i, article) {
    $article = $("<div>").addClass('img-content').addClass('blur').addClass('borderless');
    var $link = $("<a>").addClass('img-desc');
    $link.attr('href', article['short_url']).append(article['title']);
    var $img = $("<img>");
    // We have two different paths to take since some articles don't have images
    if (article['thumbnail']) {
      // We can retrieve information from the article
      $img.attr('src', article['thumbnail']['url'])
        .attr('height', article['thumbnail']['height'])
        .attr('width', article['thumbnail']['width'])
        .attr('alt', article['thumbnail']['caption']);
    }
    else {
      // Use a placeholder image otherwise
      $img.attr('src', '/assets/img/placeholder_thumbnail.png');
    }
    $article.append($img);
    $article.append($link);
    $result.append($article);
  });

  $("#main").html($result);
  return $result;
}

// Given a list of dates and short URLs to articles published, render them into HTML
function renderShortURLs(dates) {
  var data = $.parseJSON(dates);
  var $result = $("<div>");
  $result.addClass('content-container');

  // Simply loop over all the dates
  $.each(data, function(i, date) {
    var $date = $("<div>");
    $date.addClass('content');
    var $dateTitle = $("<p>")
    $dateTitle.append("Stories submitted on " + i);
    $date.append($dateTitle);
    // On each date, iterate over the array of URLs and append them
    $.each(date, function(i, url) {
      var $url = $("<a>");
      $url.append(url).attr('href', url).append('<br/>');
      $date.append($url);
    });
    $result.append($date);
  });

  $("#main").html($result);

  return $result;
}

// Given a single article, render its details into HTML
function renderDetailedArticle(article) {
  var data = $.parseJSON(article);
  var $result = $("<div>");
  $result.addClass('content-container');
  $article = $("<p>").addClass('content');


  // We can access all the relevant data entries through their keys
  var $title = $("<p>");
  $title.append(data['title']).css('font-weight', 'bold');
  var $byline = $("<p>");
  $byline.append(data['byline']);
  var $sections = $("<p>");
  $sections.append(data['section']);
  // Since some articles don't have subsections we should check for one
  if (data['subsection'].length) {
    $sections.append(' - ' + data['subsection']);
  }
  var $date = $("<p>");
  $date.append(data['published_date']).css('font-size', 'small');
  var $abstract = $("<p>");
  $abstract.append(data['abstract']);
  var $short_url = $("<a>");
  $short_url.append(data['short_url']).attr('href', data['short_url']);
  // Like usual, append it all to the new element and that to the result
  $article.append($title, $date, $byline, $sections, $abstract, $short_url);
  $result.append($article);

  $('#main').html($result);
  return $result;
}

function getInstructionsHTML() {
  $.get({
    // This should be the URL to the API you wish to access
    url: '/instructions.html',
    // With the appropriate request method
    method: 'get',
    // Then, invoke your function given some result if it succeeds
    success: function(result) {
      $("#main").html(result);
    }
  });
}

// Always make sure we wait for the document to be ready
$(document).ready(function() {
  // Initially load the instructions when first viewing this page
  getInstructionsHTML();
  // Reload the instructions page any time from the footer
  $('#instructions').click(function() {
    getInstructionsHTML();
  })
  // Listen for various button clicks and then use AJAX to forward requests
  $('#basicArticles').click(function() {
    $.getJSON({
      // This should be the URL to the API you wish to access
      url: '/articles/basic',
      // With the appropriate request method
      method: 'get',
      // Then, invoke your function given some result if it succeeds
      success: function(result) {
        renderBasicArticles(result);
      }
    });
  });
  $('#shortURLs').click(function() {
    $.getJSON({
      url: '/articles/shorturl',
      method: 'get',
      success: function(result) {
        renderShortURLs(result);
      }
    });
  });
  $('#thumbnailArticles').click(function() {
    $.getJSON({
      url: '/articles/thumbnail',
      method: 'get',
      success: function(result) {
        renderThumbnailArticles(result);
      }
    });
  });
  $('#authors').click(function() {
    $.getJSON({
      url: '/authors',
      method: 'get',
      success: function(result) {
        renderAuthors(result);
      }
    });
  });
  $('#tags').click(function() {
    $.getJSON({
      url: '/tags',
      method: 'get',
      success: function(result) {
        renderTags(result);
      }
    });
  });
  $('#detailedArticle').click(function() {
    $.getJSON({
      url: '/articles/' + $('#article_index').val(),
      method: 'get',
      success: function(result) {
        renderDetailedArticle(result);
      }
    });
  });
});
