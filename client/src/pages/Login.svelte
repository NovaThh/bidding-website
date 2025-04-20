<script>
    import page from 'page';
    import { API } from "../port.js";
    import CancelButton from "../components/CancelButton.svelte";
    import tokenStore from '../stores/tokenStore';

    let email = '';
    let password = '';
    let errorMessage = '';

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API}/tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to log in');
            }

            tokenStore.set(data.token);

            page('/');
        } catch (error) {
            errorMessage = 'Invalid credentials';
        }
    };
</script>

<main>
    <h2>Login</h2>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={handleLogin}>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required/>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required/>
        </div>
        <button type="submit">Login</button>
        <CancelButton to="/"></CancelButton>
    </form>
    <a href="/register">
       <em>Are you new? Click here for Registration</em>
    </a>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }
    div {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        height: 70%;
        font-size: 15px;
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
        width: 100%;
        margin-bottom: 10px;
    }

    button:hover {
        background-color: var(--accent-color);
    }

    a {
        margin-top: 10px;
    }

    a:hover{
        color: royalblue;
    }
    @media (max-width: 480px) {
        form {
            width: 100%;
        }

        button {
            width: 100%;
        }
    }
</style>
