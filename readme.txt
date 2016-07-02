CSC309 Summer 2016 Assignment 3 - Web Service
Daniil Kouznetsov, g3dakouz, daniil.kouznetsov@mail.utoronto.ca

RESTful API:
--------------------------------------------------
GET /articles/basic
returns:
  [{'published_date' : 'Date of Publication',
    'title' : 'The Title of the Article',
    'abstract' : 'A short synopsis of the article',
    'short_url' : 'a.short.url/to/the/article'
    },
    ...]

--------------------------------------------------
GET /articles/thumbnail
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
        "type": "type of thumbnail",
        "subtype": "subtype of thumbnail",
        "caption": "A brief description of the image",
        "copyright": "Copyright information associated with the image"
        }
    },
    ...]

--------------------------------------------------
GET /articles/shorturl
returns:
  [{'published_date' : ['date1', 'date2', ...]},
    ...]

--------------------------------------------------
GET /articles/###
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
returns:
  ['AUTHOR ONE',
   'AUTHOR TWO',
   'AUTHOR THREE',
   'AUTHOR FOUR',
   ...]

--------------------------------------------------
GET /tags
returns:
 ['Tag1' : 'Occurrences of Tag1',
  'Tag2' : 'Occurrences of Tag2',
  'Tag3' : 'Occurrences of Tag3',
  ...]
