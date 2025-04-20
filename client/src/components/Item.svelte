<script>
    import {auctionStatus} from "../stores/auctionStore.js";
    export let item;
    let countdown = "";
    let auctionEnded = false;

    const calculateCountdown = () => {
        const endDate = new Date(item.endDate).getTime();
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            countdown = "Auction ended";
            auctionEnded = true;
            auctionStatus.update(status => {
                status[item.id] = true;
                return status;
            });
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const startCountdown = () => {
        calculateCountdown();
        setInterval(calculateCountdown, 1000);
    };

    startCountdown();
</script>

<a href={`/gemstones/${item.id}`}>
    <main class="auction-item">
        <img src={item.photo} alt={item.name}/>
        <h3>{item.name}</h3>
        <p class:ended={auctionEnded}>Ends at: {countdown}</p>
        <p>Starting Price: ${item.startingPrice}</p>
    </main>
</a>

<style>
    * {
        text-decoration: none;
    }

    .auction-item {
        height: 100%;
        background-color: var(--secondary-color);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        color: var(--text-color);
        cursor: pointer;
        flex-grow: 1;
    }

    .auction-item img {
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 5px;
    }

    .auction-item:hover {
        background-color: var(--accent-color);
        transition: 300ms;
    }
    .ended {
        color: orangered;
    }

</style>
