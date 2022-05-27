# gamories
[Live Demo](https://gamories.vercel.app/)

## Table of Contents

- [Description](#description)
- [Main features](#main-features)
- [Built with](#built-with)
- [Installation and setup](#installation-and-setup)
- [What I learned in this project](#what-i-learned-in-this-project)
- [Screenshots](#screenshots)
- [Credits](#credits)

## description
Social media app to share your best gaming memories.
Upload your screenshot from a video game and tell the story to it.
It doesn't matter if it’s about a bug, a funny moment, or the most successful match of your life.
If the memory is nice to you, it has a place in gamories.

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
- clone this repo by running `git clone https://github.com/suchislif3/gamories.git`

### backend
- `cd server`
- `npm install`
- copy .env.example as .env and replace the values in the .env file.
- `npm run devStart`

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
- React memo, useCallback
- IndexedDB storage

## screenshots
![home](https://user-images.githubusercontent.com/79847008/168468652-37493de4-68a7-4614-a60a-c2e5f19b8716.png)
![edit](https://user-images.githubusercontent.com/79847008/168468610-112480e5-18a4-4542-bd05-eb0d2267fdf2.png)
![postdetails](https://user-images.githubusercontent.com/79847008/168468705-3e628352-c339-46ec-b6d8-517bd58f145a.png)
![signup](https://user-images.githubusercontent.com/79847008/168468686-d88d81bc-4d46-404c-bc8f-e40eee0ee75c.png)

## credits
- [Build and Deploy a Full Stack MERN Social Media App ](https://www.youtube.com/watch?v=VsUzmlZfYNg)
