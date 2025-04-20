<script>
    import page from 'page';
    import WinPopUp from "./WinPopUp.svelte";
    import FunctionalButton from "./FunctionalButton.svelte";
    import tokenStore, { parseJwt } from "../stores/tokenStore.js";

    export let loggedIn = false;
    export let username = '';
    export let isAdmin = false;
    export let userId = '';
    let isPopUpOpen = false;

    tokenStore.subscribe(token => {
        if (token) {
            const payload = parseJwt(token);
            loggedIn = true;
            username = payload.name || '';
            isAdmin = payload.isAdmin || false;
            userId = payload.id || '';
        } else {
            loggedIn = false;
            username = '';
            isAdmin = false;
            userId = '';
        }
    });

    const handleLogout = () => {
        tokenStore.set(null);
        if (window.location.pathname === '/') {
            window.location.reload();
        } else {
            page('/');
        }
    };

    const goToAddItemPage = () => {
        page('/addGemstone');
    };

    const goToLoginPage = () => {
        page('/login');
    };

    const openWinPopup = () => {
        isPopUpOpen = true;
    };
</script>

<main>
    <header class="container">
        <div class="title-container">
            <h1>Gemstone Auction</h1>
            {#if loggedIn}
                <span>User: {username}</span>
            {:else}
                <p>Log in for placing bids and getting your favorite item today!</p>
            {/if}
        </div>

        <div class="user-controls">
            {#if loggedIn}
                {#if isAdmin}
                    <FunctionalButton
                            label="Add Item"
                            onClick={goToAddItemPage}
                            type="edit"
                    />
                {:else}
                    <FunctionalButton label="Your Wins" onClick={openWinPopup} type="win-button"
                    />
                {/if}
                <FunctionalButton label="Logout" onClick={handleLogout} type="logout"/>
            {:else}
                <FunctionalButton label="Login/Register" onClick={goToLoginPage} type="login"/>
            {/if}
        </div>
    </header>

    {#if isPopUpOpen}
        <WinPopUp
                isOpen={isPopUpOpen}
                userName={username}
                userId={userId}
                close={() => isPopUpOpen = false}
        />
    {/if}
</main>

<style>
    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: var(--secondary-color);
        border-radius: 8px;
        color: var(--text-color);
        height: 130px;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    h1 {
        font-size: 2rem;
        color: var(--primary-color);
        margin: 0;
    }

    span {
        font-size: 1.2rem;
        color: var(--text-color);
        margin-top: 5px;
    }

    .user-controls {
        display: flex;
        align-items: center;
    }

</style>
