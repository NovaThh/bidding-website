<script>
    import {createEventDispatcher} from 'svelte';

    let selectedType = '';
    let selectedShape = '';
    let minWeight = 0;
    let maxWeight = Infinity;

    const dispatch = createEventDispatcher();

    const handleFilterChange = () => {
        const filterData = {
            selectedType,
            selectedShape,
            minWeight,
            maxWeight
        };
        dispatch('filterChange', filterData);
    };

</script>

<section>
    <h2>Filters</h2>
    <label for="type">Type</label>
    <select id="type" bind:value={selectedType} on:change={handleFilterChange}>
        <option value="">All</option>
        <option value="Sapphire">Sapphire</option>
        <option value="Pearl">Pearl</option>
        <option value="Emerald">Emerald</option>
        <option value="Diamond">Diamond</option>
        <option value="Tanzanite">Tanzanite</option>
        <option value="Topaz">Topaz</option>
        <option value="Others">Others</option>
    </select>

    <label for="shape">Shape</label>
    <select id="shape" bind:value={selectedShape} on:change={handleFilterChange}>
        <option value="">All</option>
        <option value="Rectangle">Rectangle</option>
        <option value="Round">Round</option>
        <option value="Drop">Drop</option>
        <option value="Oval">Oval</option>
        <option value="Others">Others</option>
    </select>

    <label for="weight">Weight Range (grams)</label>
    <div class="weight-range">
        <input type="number" bind:value={minWeight} min="0" max="200" on:change={handleFilterChange}/>
        <span>to</span>
        <input type="number" bind:value={maxWeight} min="0" max="200" on:change={handleFilterChange}/>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
    }

    h2 {
        color: var(--text-color);
    }

    label {
        margin: 10px 0 5px 0;
        color: var(--accent-color);
    }

    select, input {
        padding: 10px;
        border-radius: 5px;
        background-color: var(--main-bg-color);
        border: 1px solid var(--accent-color);
        color: var(--text-color);
        margin-bottom: 15px;
    }

    .weight-range {
        display: flex;
        align-items: center;
    }

    .weight-range span {
        margin: 0 10px;
        color: var(--accent-color);
    }

    .weight-range {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    input[type="number"] {
        width: 100%;
    }
</style>
