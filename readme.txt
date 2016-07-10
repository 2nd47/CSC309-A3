CSC309 Summer 2016 Assignment 3 - Web Service
Daniil Kouznetsov, g3dakouz, daniil.kouznetsov@mail.utoronto.ca

RESTful API:
--------------------------------------------------
GET /articles/basic
Get all articles with only basic data for each article

returns:
  [{'published_date' : 'Date of Publication',
    'title' : 'The Title of the Article',
    'abstract' : 'A short synopsis of the article',
    'short_url' : 'a.short.url/to/the/article'
    },
    ...]

--------------------------------------------------
GET /articles/thumbnail
Get all articles with basic data and a corresponding thumbnail

Note: if there is no thumbnail for a given article then the
  'thumbnail' field will not be initialized

returns:
  [{'published_date' : 'Date of Publication',
    'title' : 'The Title of the Article',
    'abstract' : 'A short synopsis of the article',
    'short_url' : 'a.short.url/to/the/article',
    'thumbnail' : {
        "url": "a.url.to/the/image",
        "format": "Standard Thumbnail",
        "height": 75,
        "width": 75,
        "type": "type of picture (e.g. photo)",
        "subtype": "subtype of thumbnail (e.g. panorama)",
        "caption": "A brief description of the image",
        "copyright": "Copyright information associated with the image"
        }
    },
    ...]

--------------------------------------------------
GET /articles/shorturl
Get all articles grouped by published data and represented by shortened URL

returns:
  [{'published_date1' : ['url1', 'url2', ...]},
    ...]

--------------------------------------------------
GET /articles/###
Get detailed information about a particular article given the index as it is
  stored in JSON locally
Note: some articles do not have a subsectio and the field will return empty

returns:
  {'section' : 'The main section this article is under',
   'subsection' : 'A more specific section this article fits into',
   'title' : 'The Title of the Article',
   'abstract' : 'A short synopsis of the article',
   'byline' : 'By JERRY SEINFELD',
   'published_date' : 'Date of Publication',
   'tags' : ['Tag1', 'Tag2', 'Tag3', ...]
   }

--------------------------------------------------
GET /authors
Get all authors and the number of articles they have written

returns:
  {'AUTHOR ONE' : 2,
   'AUTHOR TWO' : 1,
   'AUTHOR THREE' : 5723,
   ...}

--------------------------------------------------
GET /tags
Get all tags and their occurrences throughout all articles

returns:
 {'Tag1' : 2,
  'Tag2' : 20,
  'Tag3' : 9001,
  ...}
