# nightin
Movie and recipe recommendations for the perfect night in

Users are able to signup to create an account and login to maintain recipe and movie favorites. Each user's data is stored in a MySQL database with three tables:
    User Table: login (PK), password, firstname, and lastname
    Movie Table: login (PK), movieid(PK)
    Recipe Table: login(PK), title(PK), link

The movie and recipe favorites are read and displayed on the user's profile page.
Users are also able to update their password and delete their account on their profile page.

The website is hosted by heroku and deployed at: https://niapp-426.herokuapp.com/.