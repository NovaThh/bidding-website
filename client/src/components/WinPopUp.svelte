<script>
    import { API } from "../port.js";
    import tokenStore, {parseJwt} from "../stores/tokenStore.js";

    export let isOpen = false;
    export let wins = [];
    export let totalWinsValue = 0;
    export let userName = '';
    export let userId = '';
    export let close = () => {};

    let token;
    tokenStore.subscribe(value => {
        token = value;
        if (token) {
            const decoded = parseJwt(token);
            userId = decoded?.id || '';
        } else {
            userId = '';
        }
        console.log("User ID:", userId);
    });

    const closePopup = () => {
        close();
    };

    const fetchWins = async () => {
        try {
            const response = await fetch(`${API}/users/${userId}/wins`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Store wins
            wins = data.wins;
            // Store total value
            totalWinsValue = data.totalWinsValue;
        } else {
            console.error("Failed to fetch wins.");
        }
    } catch (error) {
        console.error("Error fetching wins:", error);
    }
    };

    $: if (isOpen) {
        fetchWins();
    }
</script>

<main>
    {#if isOpen}
        <div class="overlay" on:click={closePopup}></div>
        <div class="popup">
            <h2>{userName}'s Wins</h2>
            {#if wins.length > 0}
                <ul>
                    {#each wins as win}
                        <li>{win.gemstoneName} - ${win.amount}</li>
                    {/each}
                </ul>
                <h3>Total Wins Value: ${totalWinsValue}</h3>
            {:else}
                <p>No wins yet</p>
            {/if}
            <button on:click={closePopup}>Close</button>
        </div>
    {/if}
</main>


<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        width: 400px;
        text-align: center;
    }

    h2 {
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        font-size: 16px;
    }

    h3 {
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        color: firebrick;
    }

    button {
        padding: 7px 20px;
        background-color: #447f9d;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
    }

    button:hover {
        background-color: #063147;
    }
</style>
