<script>
    import { createEventDispatcher } from 'svelte';
    export let searchTerm = '';
    const dispatch = createEventDispatcher();

    function handleSearch() {
        dispatch('search', { searchTerm });
    }
</script>

<main class="search-bar">
    <input
            type="text"
            placeholder="Search items..."
            bind:value={searchTerm}
            on:input={handleSearch}
    />
</main>

<style>
    .search-bar {
        margin-bottom: 20px;
    }

    .search-bar input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid var(--primary-color);
    }
</style>
