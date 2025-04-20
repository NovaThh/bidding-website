<script>
    import page from 'page';

    export let to = '/';

    function handleCancel() {
        page(to);
    }
</script>

<main>
    <button class="cancel-button" on:click={handleCancel}>
        Cancel
    </button>
</main>

<style>
    .cancel-button {
        background-color: var(--primary-color);
        color: var(--text-color);
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
    }

    .cancel-button:hover {
        background-color: darkred;
    }
</style>
