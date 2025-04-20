<script>
    import Item from './Item.svelte';

    export let items = [];
</script>

<div class="items-container">
    {#if items.length === 0}
        <p>No items match search or filter criteria</p>
    {:else}
        {#each items as item (item.id)}
            <Item {item} />
        {/each}
    {/if}
</div>

<style>
    .items-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    @media (max-width: 1024px) {
        .items-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .items-container {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
