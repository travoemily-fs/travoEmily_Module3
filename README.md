# 🔐📚 WDV353: Module 3 ➪ Assignments Repo

![Repo Banner](https://www.dropbox.com/scl/fi/2tg9yj1my4tu4e6r3ryhq/repobanner.png?rlkey=u81eqfslsjercs9je5r13s52u&raw=1)

## 🔗 Student info

**♑ Full Name:** Emily Travo <br>
**🔑 Student ID:** 0005303522 <br>
**⌛ Timezone:** PST <br>
📬 Contact: EATravo@student.fullsail.edu

![Degree Program](https://img.shields.io/badge/Degree-Web%20Development-orange?logo=gnometerminal)
<br>

<hr>

### ➪ Project Directory

- 3.4: API query data from MongoDB
- 3.5 & 3.6: Unit Testing your API

<hr>

## 3.4: API query data from MongoDB

🎥 Video presentation ➪ [x](here)

### ℹ️ Assignment Overview

> Working with your API and models from last week, incorporate the operators we learned this week. Working with the API and models you made last week pick a pair of Mongo Query Operators that would fit your case the best. You can make use of select to exclude parts of a model and only return the name of a character for example. You must add these filtering mechanics to **BOTH** get all routes. The filtering needs to be done on **ONE** route. You need to follow the RESTful API standard of using your context of getting all in an endpoint. Now it's up to you as a developer to add filtering mechanics as your API data expands.

### 🛠️ Assignment Specs

- [x] Use a query string to use at least two query operators on both of your **getAll** endpoints.<br>

→ Get all **characters** endpoint query string: `?name=Draco%20Malfoy&minYear=7&maxYear=7`

- $gte + $lte used for year filtering

→ Get all **houses** endpoint query string: `?ghost=Bloody%20Baron&notFounder=Godric%20Gryffindor`

- $in + $ne used to target ghost array value for a match and checks if founder name equals the provided value or not

<hr>

- [x] Use select to exclude data from an endpoint with a query string on both of your **getAll** endpoints.<br>

→ Get all **characters** endpoint:

- `?select=-wand`
  - excludes wands from the returned response
- `?select=name,age,year`
  - returns only the name, age, and year fields (_does_ return mongoDB ID)

🔗 Example query for Postman: `http://localhost:3000/api/v1/characters?name=Draco%20Malfoy&minYear=7&maxYear=7&select=name,year`

→ Get all **Houses** endpoint:

- `?select=-colors,-motto`
  - excludes colors and motto from the returned response
- `?select=name,founder`
  - returns only the name and founder fields (_does_ return mongoDB ID)

🔗 Example query for Postman (excluding info): `http://localhost:3000/api/v1/houses?ghost=Bloody%20Baron&notFounder=Godric%20Gryffindor&select=-colors,-motto` <br><br>
🔗 Example query for Postman (including info): `GET http://localhost:3000/api/v1/houses?ghost=Bloody%20Baron&notFounder=Godric%20Gryffindor&select=name,founder`

<hr>

- [x] Use sort on at least one endpoint to return a sorted get all endpoint
      <br>

#### Using the getAll Characters endpoint

→ ` if (req.query.sort) {
      query = query.sort(req.query.sort);
    }`

🔗 Example query for Postman (sorted by ascending age): `http://localhost:3000/api/v1/characters&sort=age` <br><br>
🔗 Example query for Postman (sorted by descending age): `http://localhost:3000/api/v1/characters&sort=-age`

<hr>

- [x] Make sure pagination is on both of your **getAll** endpoints.

→ Get all **characters** endpoint pagination:

- `http://localhost:3000/api/v1/characters?name=Draco%20Malfoy&minYear=7&maxYear=7&page=1&limit=10`
  - returns the first 10 characters that match the filters, sorted as specified

→ Get all **houses** endpoint pagination:

- `http://localhost:3000/api/v1/houses?ghost=Bloody%20Baron&notFounder=Godric%20Gryffindor&page=1&limit=2`
  - returns the first page of houses, displaying only 2 per page

<hr>

## 3.5 & 3.6: Unit testing your API

🎥 Video presentation ➪ [x](here)

### ℹ️ Assignment Overview

> You will write a unit test using Jest for your API. Like last module but for the endpoints the query operators on them.

### 🛠️ Assignment Specs

You need to write 2 tests for each:

- Write a test for your API with the endpoint the returns limited data based on a query string and select.
  - [] Test 1
  - [] Test 2
- Write a test for your API that returns the pagination of the collection. Test the skip and limit of the endpoint.
  - [] Test 1
  - [] Test 2
- Write a test for the endpoint that returns your collection sorted. Test the sort in both directions.
  - [] Test 1
  - [] Test 2
