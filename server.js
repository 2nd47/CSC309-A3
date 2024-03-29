/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// From NYTimes data, retrieve all articles
function getArticles(content) {
  var articles = [];

  // Retrieve list of article results based on total number of them
  for (article in content[0]['results']) {
    articles.push(content[0]['results'][article]);
  }

  return articles;
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
  ];

  // Check to ensure such an index exists
  // For now default to the 0th article
  if (index >= articles.length) {
    index = 0;
  }

  // Get all the relevant fields for the article and return it
  for (i in fields) {
    details[fields[i]] = articles[index][fields[i]];
  }

  // Change the 'des_facet' label to something more readable and get it
  details['tags'] = articles[index]['des_facet'];

  return details
}

// From a list of articles, get a list of articles with basic info and images
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
        articlesThumbed[i]['thumbnail'] = article['multimedia'][j];
        break;
      }
    }
  }

  return articlesThumbed;
}

// By Garann Means
// From Node.js for Front-End Developers (p. 9-10)
function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

// The server will use a list of articles which have been provided by a file
function run_server(articles) {
  var hostname = '127.0.0.1';
  var port = 8080;

  var server = http.createServer(function(req, res) {
    var headers = req.headers;
    var method = req.method;
    var reqUrl = url.parse(req.url);
    var body = [];

    var filename = req.url || "/a3.html";
  	var ext = path.extname(filename);
  	var localPath = __dirname;
  	var validExtensions = {
  		".html" : "text/html",
  		".js": "application/javascript",
  		".css": "text/css",
  		".txt": "text/plain",
  		".jpg": "image/jpeg",
  		".gif": "image/gif",
  		".png": "image/png"
  	};
  	var isValidExt = validExtensions[ext];

    // Report back any errors from invalid requests
    req.on('error', function(err) {
      console.error(err);
      res.statusCode = 400;
      res.end();
    });

    req.on('data', function(chunk) {
      body.push(chunk);
    });

    req.on('end', function() {
      //body = Buffer.concat().toString();
    });

    res.on('error', function(err) {
      console.error(err);
    });

    console.log('Request at URL: ' + req.url);

    // Check for any legal methods and URL paths
    if (req.method.toLowerCase() === 'get') {
      // Return home page
      if (req.url.toLowerCase() === '/') {
        localPath += '/a3.html';
        fs.exists(localPath, function(exists) {
          if (exists) {
            console.log("Serving file: " + localPath);
            getFile(localPath, res, ext);
          }
        });
      }
      // Return any files that are needed to be loaded
      else if (isValidExt) {
          localPath += filename;
          fs.exists(localPath, function(exists) {
            if (exists) {
              console.log("Serving file: " + localPath);
              getFile(localPath, res, validExtensions[ext]);
            }
          });
      }
      // Return all articles in basic form
      else if (req.url.toLowerCase() === '/articles/basic') {
        body = body.concat(JSON.stringify(getArticlesBasic(articles))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      // Return all articles in thumbnail form
      else if (req.url.toLowerCase() === '/articles/thumbnail') {
        body = body.concat(JSON.stringify(getThumbnailArticles(articles))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      else if (req.url.toLowerCase() === '/articles/shorturl') {
        body = body.concat(JSON.stringify(getArticlesBasic(articles))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      // Return detailed information about one article
      else if (req.url.toLowerCase().match(/\/articles\/[0-9]+/)) {
        var index = req.url.toLowerCase().replace('/articles/', '');
        body = body.concat(JSON.stringify(getArticleDetail(articles, index))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      // Return all authors for all articles
      else if (req.url.toLowerCase() === '/authors') {
        body = body.concat(JSON.stringify(getAuthors(articles))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      // Return all tags used for all articles
      else if (req.url.toLowerCase() === '/tags') {
        body = body.concat(JSON.stringify(getTags(articles))).toString();
        res.writeHeader(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(body));
      }
      // There are no other endpoints for the GET method in our API
      else {
        res.statusCode = 404;
        return res.end();
      }
    }
    // There are no other methods in our API
    else {
      res.statusCode = 404;
      return res.end();
    }
  }).listen(port, hostname, function() {
      console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function main() {
  // We only want to read in the file once to save on load times
  var fileContents = fs.readFileSync("nytimes.json");
  var articleContent = JSON.parse(fileContents);
  var articles = getArticles(articleContent);
  run_server(articles);
}

main();
