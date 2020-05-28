# global-flow-on-stackoverflow

## Abstract

In this site, we visualize the Question and Answer country origin from Stackoverflow as a map.

As one of the largest website for knowledge sharing among developers, we believe that we could gain some valuable insight in the global knowledge economy by examining the questions and and answers from Stackoverflow.

We define knowledge flow between countries by the number of questions asked by users from one countries, by users of another country.

In the map within the site, you can find information about the knowledge flow between different countries among the world.

## Dataset description

Stackoverflow is a knowledge sharing site for professional and enthusiast programmers. In the site, user can freely post questions and answers. Since its founding in 2008, it has quickly grown to become a huge community with currently over 50 million active monthly users from all around the world.

We want to explore this community, discover the relationship between users’ country and posts (including questions and answers) and dig out the flow of knowledge between regions.

Our data is extracted from Google BigQuery Stack Overflow using SQL. The data includes:

* Users data:
  * Country of residence
  * ID
  * Name
  * Account created date
  * etc..
* Questions data (2016 - 2019):
  * Question ID
  * Answer count
  * Created time
  * Score
  * Owner's user ID
  * etc..
* Answers data (2016 - 2019):
  * Answer ID
  * Created time
  * Parent (question) id
  * Score
  * Owner's user ID
  * etc..

## setup
Visit: https://saibo-creator.github.io/global-flow-on-stackoverflow, or

Run `python -m http.server` to host the site locally
