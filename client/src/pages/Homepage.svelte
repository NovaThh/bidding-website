<script>
    import { API } from "../port.js";

    import Header from '../components/Header.svelte';
    import Filters from '../components/Filters.svelte';
    import Search from '../components/Search.svelte';
    import ItemList from '../components/ItemList.svelte';
    import Sort from "../components/Sort.svelte";

    let loggedIn;
    let username;
    let searchTerm = '';
    let filterData = {
        selectedType: '',
        selectedShape: '',
        minWeight: 0,
        maxWeight: Infinity
    };

    let sortData = {
        sortBy: '',
        sortOrder: '',
    };

    let items = [];
    const fetchGemstones = async () => {
        const queryParams = new URLSearchParams({
            name: searchTerm || '',
            type: filterData.selectedType || '',
            shape: filterData.selectedShape || '',
            minWeight: String(filterData.minWeight || 0),
            maxWeight: String(filterData.maxWeight || Infinity),
            sortBy: sortData.sortBy,
            sortOrder: sortData.sortOrder
        }).toString();

        const res = await fetch(`${API}/gemstones?${queryParams}`);
        const data = await res.json();

        if (res.ok) {
            items = data.gemstones || [];
        } else {
            items = [];
        }
    };

    function handleFilterChanges(event) {
        filterData = event.detail;
        handleSearch(event);
    }

    function handleSearch(event) {
        searchTerm = event.detail.searchTerm;
        fetchGemstones();
    }

    function handleSortChange(event) {
        sortData = event.detail;
        fetchGemstones();
    }

    fetchGemstones();
</script>

<main>
    <Header {loggedIn} {username}/>

    <div class="content-wrapper">
        <section class="filters">
            <Filters on:filterChange={handleFilterChanges}/>
        </section>

        <section class="auction-items">
            <div class="search-sort-container">
                <div class="search-bar">
                    <Search on:search={handleSearch}/>
                </div>
                <div class="sort-bar">
                    <Sort on:sortChange={handleSortChange}/>
                </div>
            </div>
            <ItemList {items}/>
        </section>
    </div>
</main>

<style>
    :root {
        --main-bg-color: #051821; /* Dark navy */
        --accent-color: #447F9D; /* Medium blue */
        --primary-color: #D2AE96; /* Soft beige */
        --secondary-color: #063147; /* Deep teal */
        --text-color: #fff; /* White text for better contrast */
    }

    main {
        background-color: white;
        color: #0c0c1e;
        min-height: 100vh;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Gowun Batang", serif;
    }

    .content-wrapper {
        display: flex;
        width: 100%;
        max-width: 1200px;
        margin-top: 20px;
    }

    .filters {
        width: 20%;
        background-color: var(--secondary-color);
        padding: 15px;
        margin-right: 20px;
        border-radius: 8px;
        color: var(--text-color);
    }

    .auction-items {
        flex-grow: 1;
    }

    .search-sort-container {
        justify-content: center;
        display: flex;
        gap: 20px;
    }
</style>
