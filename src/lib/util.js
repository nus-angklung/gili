/**
 * @param {string} slug 
 * @param {{ expected: number }} opts options
 * @returns {string | string[]} returns string if the slug is a leaf path
 */
export function parseSlug(slug, opts = { expected: 1}) {
    // remove trailingSlash
    if (slug.substr(-1) === "/") {
        slug = slug.substring(0, slug.length - 1)
    }

    const split = slug.split("/")
    if (split.length == 0) {
        return ""
    } else if (split.length == 1) {
        return split[0]
    } else {
        return split.slice(0, opts.expected)
    }
}