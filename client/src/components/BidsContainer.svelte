<script>
    import {API} from "../port.js";
    import Bid from "./Bid.svelte";
    import tokenStore, {parseJwt} from "../stores/tokenStore.js";
    import {auctionStatus} from "../stores/auctionStore.js";

    export let id;
    export let loggedIn;
    export let isAdmin;

    let auctionEnded = false;
    let placingBid = false;
    let bidAmount;
    let sortedList = [];

    let unsubscribe;
    let userId = '';
    let token;
    tokenStore.subscribe(value => {
        if (value) {
            token = value;
            const payload = parseJwt(value);
            userId = payload.id;
            loggedIn = true;
            isAdmin = payload.isAdmin || false;
        } else {
            loggedIn = false;
            isAdmin = false;
            userId = '';
        }
    });

    // Subscribe to auction status to track end state
    unsubscribe = auctionStatus.subscribe(status => {
        auctionEnded = status[id] || false;
    });

    async function fetchBidsList(id) {
        const response = await fetch(`${API}/gemstones/${id}/bids`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        if (!response.ok) throw new Error('Failed to fetch bids list.');
        const bidsList = await response.json();
        sortedList = bidsList.sort((a, b) => b.amount - a.amount);
    }

    async function placeBid() {
        if (!token) {
            window.alert("You need to log in before placing a bid.");
            return;
        }

        if (!bidAmount || bidAmount <= 0) {
            window.alert("Please enter a valid bid amount.");
            return;
        }

        const response = await fetch(`${API}/gemstones/${id}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: userId,
                amount: parseFloat(bidAmount),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            window.alert(errorData.error.message);
            return;
        }

        window.alert("Bid placed successfully! ");
        placingBid = false;
        bidAmount = '';
    }

    // Sets up a Server-Sent Events (SSE) connection to listen for real-time bid updates
    function setupSSE() {
        const sse = new EventSource(`${API}/gemstones/${id}/bids/stream`);
        sse.addEventListener('bidUpdate', () => {
            fetchBidsList(id);
        });
        sse.addEventListener('error', () => {
            sse.close();
        });
    }

    setupSSE();
</script>

<main>
    <div class="bids-container">
        {#await fetchBidsList(id) then _}
            <div class="bids-list">
                {#if sortedList.length > 0}
                    {#each sortedList as bid}
                        <Bid bid={bid} username={bid.userName}/>
                    {/each}
                {:else}
                    <p>No bids available for this gemstone.</p>
                {/if}
            </div>

            {#if !isAdmin && loggedIn}
                {#if !auctionEnded}
                    {#if placingBid}
                        <div class="place-bid-input-container">
                            <input type="number" bind:value={bidAmount} placeholder="Enter your bid"/>
                            <button class="place-button" on:click={placeBid}>✓</button>
                            <button class="cancel-place-button" on:click={() => placingBid = false}>X</button>
                        </div>
                    {:else}
                        <div class="place-bid-button-container">
                            <button class="place-bid-button" on:click={() => placingBid = true}>Place a Bid</button>
                        </div>
                    {/if}
                {:else}
                    <p style="color: red;">Auction has ended. No more bids can be placed.</p>
                {/if}
            {/if}
        {:catch error}
            <p>Error loading bids: {error.message}</p>
        {/await}
    </div>
</main>
<style>
    .cancel-place-button {
        background-color: firebrick;
    }

    .cancel-place-button:hover {
        background-color: darkred;
    }

    .place-button {
        background-color: var(--accent-color);
    }

    .place-button:hover {
        background-color: #063147;
    }

    .place-bid-button:hover {
        background-color: midnightblue;
        transition: 300ms;
    }

    .bids-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 250px;
        max-height: 418px;
        padding: 1rem;
        border: 2px solid var(--secondary-color);
        text-align: center;
        box-sizing: border-box;
    }

    .bids-list {
        background-color: lightgray;
        flex: 1 1 auto;
        height: 80%;
        max-height: 80%;
        overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
    }

    .place-bid-button-container, .place-bid-input-container {
        margin: 20px auto;
        display: flex;
        gap: 10px;
    }

    .place-bid-button {
        margin: 5px auto;
        padding: 0.5rem 1.5rem;
        background-color: var(--accent-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s, transform 0.3s;
    }

    .place-bid-input-container input {
        width: 100%;
        padding: 0.5rem;
        font-size: 15px;
    }

    .place-bid-input-container button {
        padding: 0.5rem 0.5rem;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    }
</style>