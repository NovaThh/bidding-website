<script>
    import page from "page";
    import { API } from "../port.js";
    import Header from "../components/Header.svelte";
    import FunctionalButton from "../components/FunctionalButton.svelte";
    import BidsContainer from "../components/BidsContainer.svelte";
    import tokenStore, { parseJwt } from "../stores/tokenStore";

    let loggedIn = false;
    let username = "";
    let isAdmin = false;
    let token;

    export let id;

    tokenStore.subscribe(value => {
        token = value;
        if (token) {
            const payload = parseJwt(token);
            loggedIn = true;
            username = payload.name;
            isAdmin = payload.isAdmin;
        } else {
            loggedIn = false;
            username = "";
            isAdmin = false;
        }
    });

    async function fetchGemstoneDetails(id) {
        const response = await fetch(`${API}/gemstones/${id}`);
        if (!response.ok) throw new Error('Failed to fetch gemstone bid details.');
        return await response.json();
    }

    async function deleteItem() {
        try {
            if (!token) {
                alert("User is not authenticated");
                return;
            }

            const response = await fetch(`${API}/gemstones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete the item.');
            alert("Item deleted successfully");
            page('/');
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    }
</script>

<main>
    <Header bind:loggedIn bind:username bind:isAdmin/>

    {#await fetchGemstoneDetails(id) then gemstoneDetails}
        {#if gemstoneDetails.name}
            <div class="gemstone-container">
                <div class="image-container">
                    <img src={gemstoneDetails.photo} alt={gemstoneDetails.name}/>
                    <h1>{gemstoneDetails.name}</h1>
                </div>

                <div class="gemstone-details-container">
                    <div class="buttons-container">
                        {#if loggedIn && isAdmin}
                            <FunctionalButton type="delete" label="Delete" onClick={deleteItem}/>
                            <FunctionalButton type="edit" label="Edit" onClick={() => page(`/updateGemstone/${id}`)}/>
                        {/if}
                    </div>
                    <p><strong>Type:</strong> {gemstoneDetails.type}</p>
                    <p><strong>Shape:</strong> {gemstoneDetails.shape}</p>
                    <p><strong>Weight:</strong> {gemstoneDetails.weight} carats</p>
                    <p><strong>Starting Price:</strong> ${gemstoneDetails.startingPrice}</p>
                    <p>{gemstoneDetails.description}</p>
                </div>

                <BidsContainer {id} {loggedIn} {isAdmin}/>
            </div>
        {:else}
            <div class="gemstone-container">
                <p>Gemstone is not available anymore :(</p>
            </div>
        {/if}
    {:catch error}
        <div class="error-message">
            <p>Error loading gemstone details: {error.message}</p>
        </div>
    {/await}

    <FunctionalButton type="back" label="Back to Home" onClick={() => page('/')}/>
</main>

<style>
    .gemstone-container {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        width: 1200px;
        margin: 0 auto;
        max-height: 450px;
    }

    .image-container {
        flex: 1;
        text-align: center;
        margin-right: 1.5rem;
    }

    .image-container img {
        width: 300px;
        height: 300px;
        object-fit: cover;
        border: 2px solid var(--secondary-color);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .image-container img:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .image-container h1 {
        margin-top: 0.75rem;
        color: var(--secondary-color);
        font-size: 1.8rem;
    }

    .gemstone-details-container {
        flex: 2;
        padding: 1.5rem;
        border: 2px solid var(--secondary-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-right: 2rem;
        overflow-y: auto;
    }

    .gemstone-details-container p {
        font-size: 1.2rem;
    }

    .buttons-container {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
    }

</style>