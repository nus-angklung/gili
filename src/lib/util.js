/**
 * @param {string} slug 
 * @param {{ expected: number }} opts options
 * @returns {string | string[]} returns string if the slug is a leaf path
 */
export function parseSlug(slug, opts = { expected: 1}) {
    // remove front and trailing slash
    slug.trimEnd();
    if (slug.slice(0, 1) == "/") {
        slug = slug.slice(1)
    }
    if (slug.slice(-1) == "/") {
        slug = slug.slice(0, -1)
    }

    const split = slug.split("/")
    if (split.length == 0) {
        return ""
    } else if (opts.expected == 1 || split.length == 1) {
        return split[0]
    } else {
        return split.slice(0, opts.expected)
    }
}
