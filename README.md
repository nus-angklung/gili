# NUS Angklung Ensemble

This is the repository of NUS Angklung Ensemble website.
The website aims to introduce Angklung CCA to NUS Students as well as inviting them to join us.

## Running the project

To run the project locally in development environment, do the following:

1. Clone the project github repository
2. Move to the project directory with

```bash
cd gili
```

3. install dependencies and run the project in development mode with:

```bash
npm install # or yarn
npm run dev
```

4. Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## Note to the contributors

As a precaution, do not push too often when you are debugging your code as a continuous deployment workflow has been setup with netlify. There is a small chance that we might hit our limit.

## Updating the team

The CCA exco structure changes every year. As a result, the technical team will be responsible to keep the `team` pages updated.

To update the `team` pages:

1. Update the `src/routes/team/[slug].json.js` file by adding the new exco in json format. For each exco member, it will require the following fields:
    - `position`: Representing the member's position.
    - `name`: Representing the member's full name.
    - `img` [Optional]: Representing the member's profile picture name as located inside `static/team/{corresponding_year}` folder. Suggested image ratio is 1:1. If no image is provided, a placeholder will be used instead.
2. Update the `current_year` value inside `src/routes/team/_constants.js` file

## Uploading to playlist

To add new cover to our playlist, do the following steps:

1. **Prepare the audio in mp3 format**: Trim the audio and consider normalizing the volume, so that users do not need to adjust the playlist volume many times. Commonly, we are using mp3 format as it works in most modern browsers. You may use this [online converter](https://online-audio-converter.com/) for converting audio format.
2. **Upload to dropbox**: This is the most convenient way of hosting audio files. Note that serving static files directly from our server is avoided as it may cause our server to overload easily.
3. Copy sharing link and replace dl=0 with dl=1 in the link
4. Insert the link into [audioData.js](https://github.com/nus-angklung/gili/blob/dev/src/routes/our-music/audioData.js) file following other track format.

## Creating news

To create a new article for our news page, do the following steps:

1. **Uploading the article text**: Write the article in plain text, save it as .txt file, and put it under our [news](https://github.com/nus-angklung/gili/tree/dev/news) folder. Note: For file naming, you may want to follow the other news format.
2. **Uploading the image**: Create an image folder under the static news folder [here](https://github.com/nus-angklung/gili/tree/dev/static/client/news). Named it according to the dates before putting the image file inside that folder.
3. **Add the news to the list**: Go to [\_news.js](https://github.com/nus-angklung/gili/blob/dev/src/routes/news/_news.js) file to update the newsList array. Note that the order does not matter as the news will be sorted based on dates with the latest comes first.

P.S. Currently, our news page only support plain text (not even an enter unfortunately) with a single image.

# sapper-template

The default [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.
