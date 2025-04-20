<script>
    import page from 'page';
    import { API } from "../port.js";
    import CancelButton from "../components/CancelButton.svelte";
    import tokenStore from '../stores/tokenStore';

    let name = '';
    let email = '';
    let password = '';
    let passwordRepeat = '';
    let errorMessage = '';

    const handleLogin = async (token) => {
        tokenStore.set(token);
        page('/');
    };

    const handleRegister = async () => {
        if (password !== passwordRepeat) {
            errorMessage = 'Passwords do not match';
            return;
        }

        try {
            const response = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Registration failed');
            }

            await handleLogin(data.token);
        } catch (error) {
            errorMessage = error.message || 'Error registering user';
        }
    };
</script>

<main>
    <h2>Register</h2>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={handleRegister}>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={name} required/>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required/>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required/>
        </div>
        <div>
            <label for="passwordRepeat">Repeat Password:</label>
            <input type="password" id="passwordRepeat" bind:value={passwordRepeat} required/>
        </div>
        <button type="submit">Register</button>
        <CancelButton to="/"></CancelButton>
    </form>
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
</style>
