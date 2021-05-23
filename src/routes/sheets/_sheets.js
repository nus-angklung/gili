/**
 * @typedef {Object} Sheet
 * @property {string} filename music sheet File name
 * @property {string} title music title
 * @property {number} lastPlayed last year the music sheet is played
 */

/**
 * @type {Sheet[]} sheets
 */
const sheets = [
    {
        filename: "avengers.pdf",
        title: "Avengers Theme",
        lastPlayed: 2021
    },
    {
        filename: "ghibli.pdf",
        title: "Ghibli Medley",
        lastPlayed: 2021
    },
]

export const sheetfiles = sheets.map(sheet => sheet.filename)

export default sheets;
