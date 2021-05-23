<script>
    import Typeahead from "svelte-typeahead";
    import sheets from "./_sheets";
</script>

<Typeahead 
    placeholder="Search for music sheets"
    hideLabel
    data={sheets}
    limit={2}
    extract={(item) => item.title}
    on:select={({ detail }) => {
    // redirect to corresponding music sheetpage
    window.location.assign("/sheets/" + detail.original.filename);
    }}
    let:result
  />
<div style="height: 5rem"/>

<style>
  /* The dropdown */
  :global([data-svelte-typeahead] ul) {
    margin-top: 5px;
    flex-direction: column;
    z-index: 1;
  }

  :global([data-svelte-typeahead] li) {
    background-color: black;
    border: none;
    padding: 0.875rem;
  }

  :global([data-svelte-typeahead] li.selected),
  :global([data-svelte-typeahead] li:hover),
  :global([data-svelte-typeahead] li.selected:hover) {
    background-color: rgba(31, 41, 55, 1); 
  }

  /* highlight letters matched */
  :global([data-svelte-typeahead] mark) {
    color: rgba(251, 191, 36, 1);
    background-color: inherit;
  }

  /* the search box */
  :global([data-svelte-search] input) {
    background-color: black;
    color: #ededed;
    border: none;
  }
</style>
