/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

$(document).ready(function() {

  var $articles_basic = $('#button_basicArticle');
  $articles_basic.click(function() {
    $.ajax({
      url: $articles_basic.parent().url,
      method: $articles_basic.parent().method,
      success: function(result){
        $('#main').html(result)
      }
    });
  })
});
