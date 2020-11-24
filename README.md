# nightin
Movie and recipe recommendations for the perfect night in

Users are able to signup to create an account and login to maintain recipe and movie favorites. Each user's data is stored in a MySQL database with three tables:
    User Table: login (PK), password, firstname, and lastname
    Movie Table: login (PK), movieid(PK)
    Recipe Table: login(PK), title(PK), link

The movie and recipe favorites are read and displayed on the user's profile page.
Users are also able to update their password and delete their account on their profile page.

We use two APIs for our recipe and movie recommendation tools.
For our recipe page, we use RecipePuppy, which lets us search based on entered ingredients. Users are able to enter additional ingredients they want to find on the input bar. Our input bar uses debouncing for autocomplete of ingredients.

The recipe page also uses the TMDB API to search for movies with titles that match the requested ingredients. 

On our movie page, we use the TMDB API to let users search for popular or top-rated movies with genre filtering criteria. The pre-populated genre options have associated TMDB-ids, which we use to filter the movie JSON objects that TMDB returns when we request page x of the popular movies. Each page is one request, so we use a recursive function to stop searching when we have either found five movies that meet the genre criteria or when we reach page 101 of the popular or top-rated movies.

The movie page also lets users search for similar movies. The input bar uses debouncing autocomplete again to fill in potential movies. When a user searches for similar movies based on a title, there are two requests made to the TMDB API: the first does a basic search based on title and the second takes the TMDB movie id of the first result from the title search and gets similar movies (an option from the TMDB API). 

On either page, user have the options to "favorite" recipes or movies by clicking the heart icon. The user's unique login and the TMDB specific movie id or the recipe title and link are stored in the movie and recipe SQL backend table respectively. When the user then clicks on their profile, we query the backend tables and populate their favorited movies and recipes for them to refer back to. 

The website is hosted by heroku and deployed at: https://niapp-426.herokuapp.com/.
