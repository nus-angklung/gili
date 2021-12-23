# NUS CAC Angklung Ensemble

This is the repository of NUS CAC Angklung Ensemble website.
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

## Tech Stack

This project is using [kit.svelte.dev](https://kit.svelte.dev) and deployed to Netlify.

## Note to the contributors

As a precaution, do not push too often when you are debugging your code as a continuous deployment workflow has been setup with netlify. There is a small chance that we might hit our limit.

## Keeping information up to date

### Updating the team

The CCA exco structure changes every year. As a result, the technical team will be responsible to keep the `team` pages updated.

To update the `team` pages:

1. Update the `src/routes/team/_teams.js` file by adding the new exco in json format. For each exco member, it will require the following fields:
    - `position`: Representing the member's position.
    - `name`: Representing the member's full name.
    - `img` [Optional]: Representing the member's profile picture name as located inside `static/client/team/{corresponding_year}` folder. Suggested image ratio is 1:1. If no image is provided, a placeholder will be used instead.
2. Update the `current_year` value inside `src/routes/team/_constants.js` file

### Uploading a new cover

To add new cover to our playlist, do the following steps:

1. **Prepare the audio in mp3 format**: Trim the audio and consider normalizing the volume, so that users do not need to adjust the playlist volume many times. Commonly, we are using mp3 format as it works in most modern browsers. You may use this [online converter](https://online-audio-converter.com/) for converting audio format.
2. **Upload to dropbox**: This is the most convenient way of hosting audio files. Note that serving static files directly from our server is avoided as it may cause our server to overload easily.
3. Copy sharing link and replace dl=0 with dl=1 in the link
4. Insert the link into [audioData.js](https://github.com/nus-angklung/gili/blob/dev/src/routes/our-music/audioData.js) file following other track format.

### Uploading music sheet

1. **Prepare the music sheet** (Preferably in pdf format). Make sure the file has been optimized too so that it doesn't send a lot too much of a bandwidth.
2. **Uploading the sheet**. Add your pdf under the [`static/client/sheets`](https://github.com/nus-angklung/gili/tree/dev/static/client/sheets) folder
3. **Add the sheets to the list**. Go to [\_sheets.js](https://github.com/nus-angklung/gili/blob/dev/src/routes/sheets/_sheets.js) file and update the sheets array. The title represents the song title, and the filename represents the pdf file name (with the extension).

### Creating news

To create a new article for our news page, do the following steps:

1. **Uploading the article text**: Write the article in plain text, save it as .txt file, and put it under our [news](https://github.com/nus-angklung/gili/tree/dev/news) folder. Note: For file naming, you may want to follow the other news format.
2. **Uploading the image**: Create an image folder under the static news folder [here](https://github.com/nus-angklung/gili/tree/dev/static/client/news). Named it according to the dates before putting the image file inside that folder.
3. **Add the news to the list**: Go to [\_news.js](https://github.com/nus-angklung/gili/blob/dev/src/routes/news/_news.js) file to update the newsList array. Note that the order does not matter as the news will be sorted based on dates with the latest comes first. Make sure that the `file` value matches the filename of the article you upload in the first step (with the file extension). The `img` value should match the filename of the image you upload in step 2 (with corresponding file extension)

P.S. Currently, our news page only support plain text (.txt files) with a single image. To separate paragraphs, insert empty lines between two paragraphs.

## Attendance system

The attendance system is modified from [https://github.com/benclmnt/attendsys](https://github.com/benclmnt/attendsys) and uses Notion as the database.

Three environment variables are needed: `NOTION_API_KEY`, `NOTION_QR_CODE_PAGE_ID`, and `NOTION_MEMBERS_DATABASE_ID`.

To log attendance for a session:

1. Create a new column in the attendance database with name `dd/mm/yyyy` (for example: 25/10/2021).
2. Head to [nusangklung.netlify.app/attendance](https://nusangklung.netlify.app/attendance) to generate the QR code.

Only check-ins via the latest generated QR code will be accepted.
