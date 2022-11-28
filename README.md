# Sticky Notes app

## About this project

This is a small React project I created as front-end practice. Drag and drop functionality is implemented with [dnd kit](https://dndkit.com/).

Users can:

-   Add/remove/edit sticky notes
-   Create clusters to group sticky notes in
-   Group sticky notes into clusters
-   Move sticky notes from one cluster to another
-   Zoom in/zoom out of the whiteboard, resizing the tool components themselves
-   Persist app data thanks to local storage

Current limitations:

-   Users cannot order the sticky notes manually
-   Users cannot edit/delete clusters. To do this, local storage data needs to be edited/deleted manually using the Browser's DevTools

## Run the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

The app will start running on [http://localhost:3000/](localhost:3000).

## Code explanation and demo

I recorded a live demo of the application as well as the explanation of the code. It can be seen on [this YouTube video](https://youtu.be/Kv0mtimdkkU).

## Screenshots

### Zoom in

![image](https://user-images.githubusercontent.com/26470569/204335695-30a0fe23-76f8-4f3d-932b-eb316ca9a078.png)

### Zoom out

![image](https://user-images.githubusercontent.com/26470569/204335522-a044716f-0cb2-45f6-889d-8e2ccbd282e0.png)
