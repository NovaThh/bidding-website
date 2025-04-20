<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let sortBy = '';
    let sortOrder = '';

    function handleSortChange() {
        dispatch('sortChange', { sortBy, sortOrder });
    }
</script>

<div class="sort-container">
    <label for="sort-by">Sort by:</label>
    <select id="sort-by" bind:value={sortBy} on:change={handleSortChange}>
        <option value="name">Name</option>
        <option value="price">Price</option>
    </select>

    <label for="sort-order">Order:</label>
    <select id="sort-order" bind:value={sortOrder} on:change={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
</div>

<style>
    .sort-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    label {
        font-size: 0.9rem;
        color: black;
    }

    select {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid var(--accent-color);
        font-size: 0.9rem;
    }

</style>
