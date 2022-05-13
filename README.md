# gamories

## description
Social media app to share your best gaming memories.
Upload your screenshot from the video game and tell the story to it.

## main features
- jwt authentication
- Google sign in (OAuth2.0)
- users can create posts including game, title, description, tags and image upload
- users can edit their posts (in-place editing)
- users can delete their posts
- users can like posts
- users can comment posts
- search in posts
- search by tags
- infinite scrolling
- light and dark mode

## built with
MongoDB, Express, React, Node

## installation and setup
- clone this repo by running git clone https://github.com/suchislif3/gamories.git

### backend
- `cd server`
- `npm install`
- copy .env.example as .env and replace the values in the .env file.
- `npm devStart`

### frontend
- `cd client`
- `npm install`
- copy .env.example as .env and replace the values in the .env file.
- `npm start`

Open http://localhost:3000 in your browser to see the result.

## what I learned in this project
- MongoDB
- Redux
- Material UI
- axios
- Google OAuth2.0
- infinite scrolling taking into account that posts can be added and deleted in the meantime
- autocomplete search input using IGDB API with debouncing
- image upload/delete using Cloudinary API
- React Dev Tools Profiler
- IndexedDB storage

## screenshots

...coming