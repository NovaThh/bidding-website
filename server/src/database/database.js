import {v4 as uuid} from 'uuid';
import bcrypt from "bcryptjs";

export const userList = [
    {
        id: uuid(),
        name: "Admin",
        email: "admin@gmail.com",
        hashPassword: bcrypt.hashSync("admin", 7),
        isAdmin: true,
        userWins: []
    },
    {
        id: "testing-id-user1",
        name: "User1",
        email: "user@gmail.com",
        hashPassword: bcrypt.hashSync("user", 7),
        isAdmin: false,
        userWins: []
    },

    {
        id: "testing-id-user2",
        name: "User2",
        email: "user2@gmail.com",
        hashPassword: bcrypt.hashSync("user2", 7),
        isAdmin: false,
        userWins: []
    }
];

export const gemstoneList = [
    {
        //this item's id is fixed for testing purpose
        id: "this-id-is-fixed-for-API-testing-purpose-in-IDE",
        name: "Friendly Eimantas Emerald",
        weight: 14, // in grams
        description: "This emerald gemstone smiles at you and gives you emotional support.",
        type: "Emerald",
        shape: "Rectangle",
        startingPrice: 900,
        endDate: "2025-1-01", // Updated
        photo: "/EimanEmerald.jpg",
        bids: [{
            id: uuid(),
            userId: userList[2].id,
            amount: 1000
        }]
    },
    {
        id: uuid(),
        name: "Yevheniias Amethyst",
        weight: 144, // in grams
        description: "A gemstone that Nova stole from Yevheniia (kidding, Nova asked if Yevheniia wanted to be on her website because she thought Yevheniia's necklace was beautiful:D)",
        type: "Amethyst",
        shape: "Others",
        startingPrice: 10000,
        endDate: "2024-10-16", // Updated
        photo: "/ZheniiaAmethyst.jpg",
        bids: [
            {
                id: uuid(),
                userId: userList[1].id,
                amount: 20000
            },
            {
                id: uuid(),
                userId: userList[2].id,
                amount: 19999
            }
        ]
    },
    {
        id: uuid(),
        name: "Sapphire Seal, Qing Dynasty, China",
        weight: 144, // in grams
        description: "An Asian Private Collection of Chinese Art",
        type: "Sapphire",
        shape: "Rectangle",
        startingPrice: 250,
        endDate: "2024-10-16", // Updated
        photo: "https://image.invaluable.com/housePhotos/hotspot/37/777637/H22997-L381854313.jpg",
        bids: [
            {
                id: uuid(),
                userId: userList[1].id,
                amount: 350
            },
            {
                id: uuid(),
                userId: userList[2].id,
                amount: 20000
            },
            {
                id: uuid(),
                userId: userList[2].id,
                amount: 300
            }
        ]
    },
    {
        id: "testing-id2",
        name: "Royal Blue Pearl Japan",
        weight: 120, // in grams
        description: "A rare and exquisite pearl from Japan's finest collections.",
        type: "Pearl",
        shape: "Round",
        startingPrice: 200,
        endDate: "2024-10-17", // Updated
        photo: "https://www.nahoku.com/cdn/shop/products/C0454815_203152.jpg?v=1669858897",
        bids: [
            {
                id: uuid(),
                userId: userList[1].id,
                amount: 350
            }
        ]
    },
    {
        id: uuid(),
        name: "Opulent Garnet",
        weight: 20, // in grams
        description: "A stunning garnet from a historic Spanish collection.",
        type: "Garnet",
        shape: "Drop",
        startingPrice: 1000,
        endDate: "2024-10-31", // Updated
        photo: "https://heritagegemsandjewels.com/cdn/shop/products/img01_e98cc853-6458-4218-b9a0-116ec1ccdff1.jpg?v=1607115912&width=600",
        bids: []
    },
    {
        id: uuid(),
        name: "Royal Emerald, Colombian Heritage",
        weight: 10, // in grams
        description: "An exquisite emerald from Colombia's historical mines.",
        type: "Emerald",
        shape: "Square",
        startingPrice: 500,
        endDate: "2024-11-10", // Updated
        photo: "https://cdn.shopify.com/s/files/1/0522/9690/8962/files/box-hi-600x600.webp?v=1688664654",
        bids: []
    },
    {
        id: uuid(),
        name: "Imperial Topaz cut 7.6x4MM",
        weight: 5, // in grams
        description: "A unique topaz from the Imperial collection of Brazil.  Natural Imperial Topaz, also known as precious Topaz from Ouro Preto - Brazil. Golden-yellowish colour - AA colour grade. Eye clean gemstone. Classic pear cut.",
        type: "Topaz",
        shape: "Drop",
        startingPrice: 50,
        endDate: "2024-10-31", // Updated
        photo: "https://gemstonesbrazil.com/cdn/shop/products/image_82d2ec8a-7a88-42a3-b5db-35a0ae260c4c_large.jpg?v=1686919622",
        bids: []
    },
    {
        id: uuid(),
        name: "Koh-i-Noor Diamond (Victorian Era)",
        weight: 21, // in grams
        description: "A rare diamond from the Victorian era in England. Kohinoor is now part of the British Monarch, Queen Elizabet",
        type: "Diamond",
        shape: "Round",
        startingPrice: 300000000,
        endDate: "2025-2-19", // Updated
        photo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Replica_of_the_Koh-i-Noor_%28cropped%29.jpg",
        bids: []
    },
    {
        id: "testing-id3",
        name: "Lustrous Tanzanite, African Discovery, Tanzania",
        weight: 5, // in grams
        description: "This Tanzanite stone is found in only one spot on earth: Tanzania, East Africa, at the foot of Mount Kilimanjaro",
        type: "Tanzanite",
        shape: "Rectangle",
        startingPrice: 45,
        endDate: "2025-1-22", // Updated
        photo: "https://www.mineralmike.com/cdn/shop/products/201ct-Tanzanite-Crystal_5000x.jpg?v=1663781060",
        bids: []
    },
    {
        id: "testing-id4",
        name: "Exquisite Alexandrite from Russia",
        weight: 110, // in grams
        description: "Alexandrite is a variety of Chrysoberyl, a mineral that is chemically Beryllium Aluminate (BeAl2O4). The gemstone is notable for its distinct color-change effect – a shift from green-blue to purple-red hues – in daylight and incandescent light",
        type: "Alexandrite",
        shape: "Drop",
        startingPrice: 200,
        endDate: "2025-1-23", // Updated
        photo: "https://images.squarespace-cdn.com/content/v1/51cc2af8e4b03f55519413b2/1627489347318-D8YYUK46DEVINXECEAB8/ORT202101271701.jpg?format=750w",
        bids: [
            {
                id: uuid(),
                userId: userList[2].id,
                amount: 205
            }
        ]
    },
    {
        id: uuid(),
        name: "Mystical Moonstone from India",
        weight: 5, // in grams
        description: "A mystical moonstone from a celestial collection in India.",
        type: "Moonstone",
        shape: "Oval",
        startingPrice: 550,
        endDate: "2024-12-29", // Updated
        photo: "https://thebeautyintherocks.com/10016-thickbox_default/blue-moonstone-452-ct.jpg",
        bids: []
    },
    {
        id: uuid(),
        name: "Majestic Golden Honey Citrine Flame Crystal",
        weight: 14, // in grams
        description: "Meticulously sourced from the depths of the Earth, these crystals embody the enchanting allure of golden honey citrine, reflecting our dedication to showcasing the most splendid treasures of the natural world.",
        type: "Citrine",
        shape: "Other",
        startingPrice: 90,
        endDate: "2025-12-29",
        photo: "https://spectralstones.com/cdn/shop/files/1_4ba459a2-1379-4f48-b141-de3b74b98742.jpg?v=1711694672&width=1445",
        bids: []
    }
];

