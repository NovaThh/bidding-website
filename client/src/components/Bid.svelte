<script>
    export let bid;
    export let username;
</script>

<div class="bid">
    <p><strong>Bidder:</strong> {username}</p>
    <p><strong>Amount:</strong> ${bid.amount}</p>
</div>

<style>
    .bid {
        width: 90%;
        border-radius: 5px;
        border: 1.5px solid var(--secondary-color);
        padding: 5px;
        margin: 10px auto 5px;
        color: black;
        background-color: white;
        font-size: 15px;
    }

    .bid p {
        margin: 0;
    }

</style>
