# Smart Brain Web App API Deno
Face Detection Web App API recreated in Deno.

## Functionality
The API can be used to register users, signin a user, get a profile by its id, and send an image to Clarifai Face Detection API. It also keeps track of how many images were sent by each user.
=> I STOPPED HERE
## Frameworks
1. Clarifai API
2. bcrypt-nodejs
3. Knex
4. Pg
5. Cors
6. Express
7. Nodemon

## Installation
1. Clone this repo
2. Run `npm install`
3. Connect server.js to your database.
4. Include Clarifai API Key in controllers/image.js
5. Run `npm start`

## Backend API
Ensure the backend is running, by making a GET request to http://localhost:3001/ (you can change the port by providing an environment variable)

## Frontend
Frontend Repo be found [HERE](https://github.com/karimkhattaby/smart-brain)

## Hosted Version
The latest version is deployed and hosted on Heroku. Check it out by clicking [HERE](https://smart-brain-karim.herokuapp.com/).

## Usage
1. You can login using these credentials:
- Email: `test@test.com`
- Password: `test123`

Or you can Register using a fake email/password.<br><br>
2. Afterwards, you need to enter a direct image link
(right click on image and click on `Copy Image Address`)

## Notes
1. The Web App uses SSL encryption through HTTPS protocol to transfer input data.
2. Passwords are hashed once received by the backend.
3. Despite 1 and 2, I'd still recommend using a fake/weak password to avoid any potential future attacks.
4. Emails aren't verified, so you can use any email even if it's fake.
5. Entered images URLs are NEVER stored in the database or API logs.

## Troubleshooting
1. If your image isn't working, make sure the image URL points directly to the image file (you might want to right click on the image and click on `Copy Image Address`).<br>
If you are sure about the image, maybe the face detection API reached its 5000 images per month limit.<br>
However, do check your browser console for any potential bad requests or errors, and raise an issue in case you find any.<br><br>
2. Sometimes the server responds slow for signin/register requests, so please be patient.<br>
However, do check your browser console for any potential bad requests or errors, and raise an issue in case you find any.