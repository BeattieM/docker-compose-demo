# React and Rails in Docker
This is a rebuild of my previous demo application [Twittermon](https://github.com/BeattieM/twittermon) where I will be replacing the front-end with React and moving the Rails portion in to the [Reactive API](https://github.com/BeattieM/reactive-api). repo.

## Original Requirements

- Posts
  - Users should be able to submit posts that are stored to a database.
  - All posts should be displayed in a feed on the home page.
  - You can optionally implement update and delete functionality **[optional]**.
  - Customizing the feed depending on user account is **not** required.
- External Data
  - Users are anonymized, so each time a post is submitted, a random Pokemon is assigned to the post and shows up as the username.
  - Make a call to the Pokemon API when each post is created to select a random Pokemon name: http://pokeapi.co/ 
- Authentication **[optional]**
  - Users should be able to create an account, login, and logout.
  - Account management features, like updating email or password, are **not** needed.
  - Posts should still be viewable to anonymous users.

## Running the project
This project utilizes the latest versions of Docker and Docker Compose. Please make sure your system is at least somewhat up to date with the most recent version of both.

### Starting the containers
**Building from scratch:**
- `docker-compose build`
- `docker-compose up`

At this point you should be able to view the project at `localhost:8080`.

**Subsequent restarts:**
- `docker-compose up`
