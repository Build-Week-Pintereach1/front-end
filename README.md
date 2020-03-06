# Pintereach
## Save Articles and Categorize Them For Later

A live version of this website can be found at:
`https://build-week-pintereach1.github.io/front-end/`

### To install this project locally;

1. Fork the master branch of this repo.
1. Use GitBash or your favorite CLI to change directories to where you want to keep your fork.
1. Run `git clone X` where X is your cloned link from GitHub.
1. cd into the new folder, which should be called `front-end`.
1. Run `npm install` to install dependencies.
1. You should now be able to work on the project.

Once you are ready to view changes on your version of the project, run `npm start` in your CLI (which should be pointed at the project folder) to pull up a local server of the React app.

### General structure of the code.
The app begins in index.js, where we render our App.js which holds all of the components.

From App.js we have Login.js and Dashboard.js components. The former holds login and registration forms and handlers, while the latter holds the code for saving articles. In Dashboard.js we are pulling in the Article.js component, which itself also pulls in the AddCategory.js component.
The Article.js component will build the general structure for the entire articles list as well as dynamically render articles which have been stored in the backend. The AddCategory.js component holds logic for assigning categories to individual articles.
