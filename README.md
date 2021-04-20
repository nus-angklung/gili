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

## Updating the team

The CCA exco structure changes every year. As a result, the technical team will be responsible to keep the `team` pages updated.

To update the `team` pages:

1. Update the `src/routes/team/[slug].json.js` file by adding the new exco in json format. For each exco member, it will require the following fields:
    - `position`: Representing the member's position.
    - `name`: Representing the member's full name.
    - `img` [Optional]: Representing the member's profile picture name as located inside `static/team/{corresponding_year}` folder. Suggested image ratio is 1:1. If no image is provided, a placeholder will be used instead.
2. Update the `current_year` value inside `src/routes/team/_constants.js` file

## Note to the contributors

As a precaution, do not push too often when you are debugging your code as a continuous deployment workflow has been setup with netlify. There is a small chance that we might hit our limit.

# sapper-template

The default [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.
