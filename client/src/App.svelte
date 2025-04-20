<script>
    import page from 'page';
    import Homepage from "./pages/Homepage.svelte";
    import ItemDetails from "./pages/ItemDetails.svelte";
    import AddItem from "./pages/AddItem.svelte";
    import UpdateItem from "./pages/UpdateItem.svelte";
    import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";

    let currentPage;
    let currentParams = {};

    page('/', () => {
        currentPage = Homepage;
        currentParams = {};
    });

    page('/gemstones/:id', (ctx) => {
        currentPage = ItemDetails;
        currentParams = {id: ctx.params.id};
    });

    page('/addGemstone', () => {
        currentPage = AddItem;
    });

    page('/updateGemstone/:id', () => {
        currentPage = UpdateItem;
    });

    page('/login', () => {
        currentPage = Login;
    });

    page('/register', () => {
        currentPage = Register;
    });

    page();
</script>
{#if currentPage}
    <svelte:component this={currentPage} {...currentParams}/>
{/if}

<style>
    :global(*) {
        caret-color: transparent;
        box-sizing: border-box;
    }
</style>