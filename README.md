# Smart Brain Web App API Deno
Face Detection Web App API rewritten in Deno.

## Functionality
The API can be used to register users, signin a user, get a profile by its id, and send an image to Clarifai Face Detection API. It also keeps track of how many images were sent by each user.

## Tech Stack
Front-end: React<br>
Back-end: Deno<br>
Database: PostgreSQL<br>

## Backend Frameworks
1. Clarifai API
2. Oak Router
3. Bcrypt
4. Deno-Postgres
5. Cors
6. Deno Standard Library

## Installation
1. Install Deno from https://deno.land/
2. Clone this repo
3. Run the following command in terminal: `deno run -A mod.ts`

## Frontend
Frontend Repo be found [HERE](https://github.com/karimkhattaby/smart-brain)

## Backend API
Ensure the backend is running, by making a GET request to http://localhost:3002/

## Backend Node.js API
This project was initially written in javascript using Node.js as the backend. You can find it by clicking [HERE](https://github.com/karimkhattaby/smart-brain-api).

## Hosted Version
The latest version is deployed and hosted on Heroku. Check it out by clicking [HERE](https://smart-brain-karim.herokuapp.com/).<br>
Note: The hosted version's backend is Node.js

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