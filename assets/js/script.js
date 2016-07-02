/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

// Given a list of articles and their data, render them into HTML
function renderBasicArticles(articles) {
  var data = $.parseJSON(articles);
  var $result = $("<div>");
  $result.addClass('article-container');

  var article;
  $.each(data, function(i, item) {
    var $article = $("<div>");
    $article.addClass('article');
    var $date = $("<p>");
    console.log($date);
    $date.append(item['published_date']);
    $article.append($date);
    $result.append($article);
  });

  console.log($result.html());
  $("#main").append($result);

  return $result;
}

// Given a list of tags and their occurrences, render them into html
function renderTags(tags) {
  var $result;

  return $result;
}

// Given a list of authors, render them into HTML
function renderAuthors(authors) {
  var $result;

  return $result;
}

// Given a list of articles and their images, render them into HTML
function renderThumbnailArticles(articles) {
  var $result;

  return $result;
}

// Given a list of dates and short URLs to articles published, render them into HTML
function renderShortURLs(dates) {
  var $result;

  return $result;
}

// Given a single article, render its details into HTML
function renderDetailedArticle(article) {
  var $result;

  return $result;
}

$(document).ready(function() {
  $('#button_basicArticles').click(function() {
    $.getJSON({
      url: '/articles/basic',
      method: 'get',
      success: function(result) {
        renderBasicArticles(result);
      }
    });
  });
  $('#button_shortURLs').click(function() {
    $.getJSON({
      url: '/articles/shorturl',
      method: 'get',
      success: renderShortURLs(data)
    });
  });
  $('#button_thumbnailArticles').click(function() {
    $.getJSON({
      url: '/articles/thumbnail',
      method: 'get',
      success: renderThumbnailArticles(data)
    });
  });
  $('#button_authors').click(function() {
    $.getJSON({
      url: '/authors',
      method: 'get',
      success: renderAuthors(data)
    });
  });
  $('#button_tags').click(function() {
    $.getJSON({
      url: '/tags',
      method: 'get',
      success: renderTags(data)
    });
  });
  $('#button_detailedArticle').click(function() {
    $.getJSON({
      url: '/articles/thumbnail',
      method: 'get',
      success: renderDetailedArticle(data)
    });
  });
});
