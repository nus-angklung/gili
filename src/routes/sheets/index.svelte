<script>
    import Typeahead from "svelte-typeahead";
    import sheets from "./_sheets";
</script>

<Typeahead 
    placeholder=" 🔍 Search for music sheets"
    hideLabel
    data={sheets}
    limit={4}
    extract={(item) => item.title}
    on:select={({ detail }) => {
    // redirect to corresponding music sheetpage
    window.location.assign("/sheets/" + detail.original.filename);
    }}
    let:result
  />
<div style="height: 12rem"/>

<style>
    :global(div[data-svelte-typeahead]), :global(div[data-svelte-typeahead] ul) {
        box-shadow: 0px 2px 16px 2px rgba(251, 191, 36, 1);
    }

    /* The dropdown */
    :global(div[data-svelte-typeahead] ul) {
        margin-top: 5px;
        flex-direction: column;
        z-index: 1;
    }

    :global(div[data-svelte-typeahead] li) {
        background-color: black;
        border: none;
        padding: 0.875rem;
    }

    :global(div[data-svelte-typeahead] li:last-child) {
        border-radius: 0 0 .375rem .375rem;
    }

    :global(div[data-svelte-typeahead] li.selected),
    :global(div[data-svelte-typeahead] li:hover),
    :global(div[data-svelte-typeahead] li.selected:hover) {
        background-color: rgba(31, 41, 55, 1); 
    }

    /* highlight letters matched */
    :global(div[data-svelte-typeahead] mark) {
        color: rgba(251, 191, 36, 1);
        background-color: inherit;
    }

    /* the search box */
    :global(form[data-svelte-search] input) {
        background-color: black;
        border-radius: 0.375rem;
        font-size: 1.5rem;
        color: #ededed;
        border: 1px solid rgba(251, 191, 36, 1);
    }
</style>
