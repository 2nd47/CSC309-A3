/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

var http = require('http');
var fs = require('fs');

// From NYTimes data, retrieve all articles
function getArticles(content) {
  var articles = [];

  // Retrieve list of article results based on total number of them
  for (article in content[0]['results']) {
    articles.push(content[0]['results'][article]);
  }

  return articles;
}

// Group a set of article data by a given field (e.g. 'published_date')
function groupBy(articles, field) {

}

// From a list of articles, retrieve basic information on all of them
function getArticlesBasic(articles) {
  var articlesBasic = [];

  // Fetch some basic information from each article
  var article;
  for (i in articles) {
    article = articles[i];
    articlesBasic.push({
      'published_date' : article['published_date'],
      'title' : article['title'],
      'abstract' : article['abstract'],
      'short_url' : article['short_url']
    });
  }

  return articlesBasic;
}

// From a list of articles, retrieve all authors
function getAuthors(articles) {
  var authors = [];

  // For each article, strip out and separate all authors then add individually
  var article;
  // Store authors of each individual story temporarily
  var articleAuthors = [];
  for (i in articles) {
    article = articles[i];
    articleAuthors = article['byline'].replace('By ', '').split(' and ');
    for (i in articleAuthors) {
      authors.push(articleAuthors[i]);
    }
  }

  return authors;
}

// From a list of articles, get all stories' short URLs grouped by publish date
function getShortURLs(articles) {
  var shortURLs = {};

  var article;
  var grouping;
  for (i in articles) {
    article = articles[i];
    if (shortURLs[article['published_date']]) {
      shortURLs[article['published_date']].push(article['short_url']);
    }
    else {
      shortURLs[article['published_date']] = [article['short_url']];
    }

  }

  return shortURLs;
}

// From a list of articles, get how many times every tag was used to tag them
function getTags(articles) {
  var tags = {};

  var article;
  var tag;
  // Iterate over all articles
  for (i in articles) {
    article = articles[i];
    // Iterate over all tags
    for (j in article['des_facet']) {
      tag = article['des_facet'][j];
      // Begin or add to the count of any given tag
      if (tags[tag]) {
        tags[tag] += 1;
      }
      else {
        tags[tag] = 1;
      }
    }
  }

  return tags;
}

// From a list of articles and an article index, get the details of that article
function getArticleDetail(articles, index) {
  var details = {};
  var fields = [
    'section',
    'subsection',
    'title',
    'abstract',
    'byline',
    'published_date',
    'des_facet'
  ];

  // Get all the relevant fields for the article and return it
  for (i in fields) {
    details[fields[i]] = articles[index][fields[i]];
  }

  return details
}

// From a list of articles, retrieve them as a list of basic info and images
function getThumbnailArticles(articles) {
  var articlesThumbed = [];

  var article;
  for (i in articles) {
    article = articles[i];
    // Return some basic info on any given article
    articlesThumbed.push({
      'published_date' : article['published_date'],
      'title' : article['title'],
      'abstract' : article['abstract'],
      'short_url' : article['short_url']
    });
    // Check and return a standard thumbnail for the given article
    for (j in article['multimedia']) {
      if (article['multimedia'][j]['format'] === 'Standard Thumbnail') {
        articlesThumbed[i]['multimedia'] = article['multimedia'][j];
      }
    }
  }

  return articlesThumbed;
}

function run_server() {
  var hostname = '127.0.0.1';
  var port = 8080;

  var fileContents = fs.readFileSync("nytimes.json");
  var jsonContent = JSON.parse(fileContents);

  var articles = getArticles(jsonContent);
  var articleBasics = getArticlesBasic(articles);
  var authors = getAuthors(articles);
  var shortURLsGrouped = getShortURLs(articles);
  var tagCloud = getTags(articles);
  var detailedArticle = getArticleDetail(articles, 0);
  var thumbnailArticles = getThumbnailArticles(articles);
  console.log(thumbnailArticles);

  var server = http.createServer(function(req, res) {
    if(req.url === '/' || req.url === '/index.html') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
    }
    else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(port, hostname, function() {
      console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function main() {
  run_server();
}

main();
