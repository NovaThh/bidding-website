<script>
    export let label;
    export let onClick;
    export let type;
</script>
<button class={type} on:click={onClick}>
    {label}
</button>
<style>
    button{
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s, transform 0.3s;
    }

    .delete {
        background-color: #f44336;
        color: white;
    }

    .delete:hover {
        background-color: #d32f2f;
    }

    .edit {
        background-color: var(--accent-color);
        color: white;
    }

    .edit:hover {
        background-color: midnightblue;
    }

    .win-button {
        background-color: khaki;
        color: saddlebrown;
    }

    .win-button:hover {
        padding: 11px 20px;
        transition: 200ms;
        color: saddlebrown;
        background-color: gold;
    }

    .login, .logout {
        background-color: var(--primary-color);
        color: var(--text-color);
        border: none;
        padding: 10px 15px;
        margin-left: 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        font-size: 15px;
    }

    .login, .logout:hover {
        background-color: var(--accent-color);
        transition: 500ms;
    }

    .back {
        background-color: var(--secondary-color);
        color: var(--text-color);
        text-transform: uppercase;
        font-weight: bold;
        padding: 10px 20px;
        border: 2px solid var(--secondary-color);
        margin-left: 45%;
    }

    .back:hover {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
        color: var(--secondary-color);
    }

</style>