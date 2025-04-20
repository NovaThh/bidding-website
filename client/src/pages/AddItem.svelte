<script>
    import { createEventDispatcher } from 'svelte';
    import { API } from "../port.js";
    import page from 'page';
    import { v4 as uuid } from 'uuid';
    import CancelButton from '../components/CancelButton.svelte';
    import tokenStore from '../stores/tokenStore';

    let token;
    tokenStore.subscribe(value => token = value);
    const dispatch = createEventDispatcher();

    let gemstoneDetails = {
        name: '',
        type: '',
        shape: '',
        weight: null,
        startingPrice: null,
        photo: '',
        description: ''
    };

    const currentDate = new Date();
    // Initialize the auction end date
    let endDate = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    };

    // Validates the provided end date
    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }

    // Fetches the number of days in a specific month
    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    async function addItem(event) {
        event.preventDefault();

        const { day, month, year } = endDate;
        const isDateValid = isValidDate(day, month, year) && new Date(year, month - 1, day) > currentDate;
        if (!isDateValid) {
            alert('Invalid date. Please ensure the date is in the future and is valid.');
            return;
        }

        const newItem = {
            id: uuid(),
            ...gemstoneDetails,
            endDate: `${year}-${month}-${day}`
        };

        try {
            if (!token) {
                alert("User is not authenticated");
                return;
            }

            const response = await fetch(`${API}/gemstones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                alert('Item added successfully!');
                dispatch('submit', newItem);
                page('/');
            } else {
                const errorData = await response.json();
                alert(`Failed to add item: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error adding item: ' + error.message);
        }
    }

    // Predefined gemstone types and shapes for selection
    const types = ['Sapphire', 'Pearl', 'Emerald', 'Diamond', 'Tanzanite', 'Topaz', 'Others'];
    const shapes = ['Rectangle', 'Round', 'Drop', 'Oval', 'Others'];
</script>


<main>
    <form class="form-container" on:submit={addItem}>
        <label>
            <span>Name (max 50 characters):</span>
            <input type="text" bind:value={gemstoneDetails.name} maxlength="50" required minlength="3"/>
        </label>

        <div class="row">
            <label class="half">
                <span>Type:</span>
                <select bind:value={gemstoneDetails.type} required>
                    <option disabled value="">Select Type</option>
                    {#each types as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
            </label>

            <label class="half">
                <span>Shape:</span>
                <select bind:value={gemstoneDetails.shape} required>
                    <option disabled value="">Select Shape</option>
                    {#each shapes as shape}
                        <option value={shape}>{shape}</option>
                    {/each}
                </select>
            </label>
        </div>

        <div class="row">
            <label class="half">
                <span>Weight (in carats):</span>
                <input type="number" bind:value={gemstoneDetails.weight} min="0" step="0.01" required/>
            </label>

            <label class="half">
                <span>Starting Price (in USD):</span>
                <input type="number" bind:value={gemstoneDetails.startingPrice} min="1" step="1" required/>
            </label>
        </div>

        <label>
            <span>Description:</span>
            <textarea bind:value={gemstoneDetails.description} rows="4" required minlength="1"></textarea>
        </label>

        <label>
            <span>Photo URL:</span>
            <input type="text" bind:value={gemstoneDetails.photo} required/>
        </label>

        <label>
            <span>End Date:</span>
            <div class="end-date">
                <input type="number" bind:value={endDate.day}
                       min="{endDate.month === currentDate.getMonth() + 1 && endDate.year === currentDate.getFullYear() ? currentDate.getDate() : 1}"
                       max="{getDaysInMonth(endDate.month, endDate.year)}" required/>
                <input type="number" bind:value={endDate.month}
                       min="{endDate.year === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 1}"
                       max="12" required/>
                <input type="number" bind:value={endDate.year} min="{currentDate.getFullYear()}" required/>
            </div>
        </label>

        <button type="submit">Add Item</button>
        <CancelButton to="/"/>
    </form>
</main>

<style>
    * {
        box-sizing: border-box;
    }

    main {
        background-color: lightgray;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        margin: 0 auto;
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background-color: var(--main-bg-color);
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-between;
    }

    .half {
        flex: 1;
        min-width: 0;
    }

    input, select, textarea {
        padding: 8px;
        border: none;
        border-radius: 4px;
        color: black;
        font-size: 16px;
        width: 100%;
    }

    .end-date {
        display: flex;
        gap: 16px;
    }

    .end-date input {
        width: 80px;
        text-align: center;
    }

    button {
        background-color: var(--primary-color);
        color: var(--text-color);
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: chocolate;
    }

    @media (max-width: 480px) {
        .form-container {
            padding: 16px;
        }

        .row {
            flex-direction: column;
            gap: 10px;
        }

        .half {
            width: 100%;
        }

        .end-date {
            flex-direction: column;
            gap: 10px;
        }

        .end-date input {
            width: 100%;
        }

        button {
            width: 100%;
        }
    }
</style>