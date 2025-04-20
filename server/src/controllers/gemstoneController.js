import {gemstoneList, userList} from "../database/database.js";
import {v4 as uuid} from 'uuid';

let sseClients = [];

/**
 * Fetches gemstones with optional filtering, sorting, and searching.
 * @param {Object} req - The HTTP request object containing query parameters for filtering.
 * @param {Object} res - The HTTP response object used to return filtered gemstones.
 */
export const getGemstones = (req, res) => {
    const {name, type, shape, minWeight, maxWeight, sortBy, sortOrder} = req.query;
    let filteredGemstones = gemstoneList;

    // Filter by name (partial match, case-insensitive)
    if (name) {
        filteredGemstones = filteredGemstones.filter(gem =>
            gem.name.toLowerCase().includes(name.toLowerCase())
        );

        return res.status(200).json({gemstones: filteredGemstones});
    }

    // Apply other filters (type, shape, weight range)
    if (type && type !== "") {
        filteredGemstones = filteredGemstones.filter(gem =>
            gem.type.toLowerCase() === type.toLowerCase()
        );
    }

    if (shape && shape !== "") {
        filteredGemstones = filteredGemstones.filter(gem =>
            gem.shape.toLowerCase() === shape.toLowerCase()
        );
    }

    if (minWeight) {
        filteredGemstones = filteredGemstones.filter(gem =>
            gem.weight >= parseFloat(minWeight)
        );
    }

    if (maxWeight) {
        filteredGemstones = filteredGemstones.filter(gem =>
            gem.weight <= parseFloat(maxWeight)
        );
    }

    // Return full list if no specific filters are applied
    if (
        !type &&
        !shape &&
        (!minWeight || minWeight === '0') &&
        (!maxWeight || maxWeight === Infinity)
    ) {
        return res.status(200).json({gemstones: gemstoneList});
    }

    // Sort by specified field and order
    if (sortBy && sortOrder) {
        const isAscending = sortOrder.toLowerCase() === 'asc';
        filteredGemstones.sort((a, b) => {
            if (sortBy === 'name') {
                return isAscending
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            if (sortBy === 'price') {
                return isAscending
                    ? a.startingPrice - b.startingPrice
                    : b.startingPrice - a.startingPrice;
            }
            return 0;
        });
    }

    return res.status(200).json({gemstones: filteredGemstones});
};

/**
 * Fetches a gemstone by its unique ID.
 * @param {Object} req - The HTTP request object containing the gemstone ID in params.
 * @param {Object} res - The HTTP response object used to return the gemstone or an error.
 */
export const getGemstoneWithID = (req, res) => {
    const {gemstoneId} = req.params;
    const gem = gemstoneList.find(gem => gem.id === gemstoneId);
    if (!gem) {
        return res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "No gemstones found."
                }
            }
        );
    }
    return res.status(200).json(gem);
};

/**
 * Adds a new gemstone to the collection.
 * @param {Object} req - The HTTP request object containing gemstone details in the body.
 * @param {Object} res - The HTTP response object used to confirm creation or return errors.
 */
export const addGemstone = (req, res) => {
    const {name, weight, type, shape, description, startingPrice, endDate, photo} = req.body;

    if (!name || !weight || !type || !shape || !description || !startingPrice || !endDate || !photo) {
        return res.status(400).json({
            error: {
                code: 400,
                message: "All fields are required."
            }
        });
    }

    const newGem = {
        id: uuid(),
        name,
        weight,
        description,
        type,
        shape,
        startingPrice,
        endDate,
        photo,
        //a gemstone that is just created has empty list of bids
        bids: []
    };

    gemstoneList.push(newGem);

    return res.status(201).json({
        message: "Gemstone successfully created.",
        gemstone: newGem
    });

};

export const updateGemstone = (req, res) => {
    const {gemstoneId} = req.params;
    const {name, weight, type, shape, description, startingPrice, endDate, photo} = req.body;

    const gemstoneIndex = gemstoneList.findIndex(gemstone => gemstone.id === gemstoneId);
    if (gemstoneIndex === -1) {
        return res.status(404).json({
            error: 'Gemstone is not found'
        });
    }

    gemstoneList[gemstoneIndex] = {
        ...gemstoneList[gemstoneIndex],
        name,
        weight,
        type,
        shape,
        description,
        startingPrice,
        endDate,
        photo
    };

    return res.status(200).json({
        message: 'Gemstone successfully updated!',
        gemstone: gemstoneList[gemstoneIndex]
    });

};

export const deleteGemstone = (req, res) => {
    const {gemstoneId} = req.params;
    const gemstoneIndex = gemstoneList.findIndex(gemstone => gemstone.id === gemstoneId);
    if (gemstoneIndex === -1) {
        return res.status(404).json({
            message: 'Gemstone not found'
        });
    }

    gemstoneList.splice(gemstoneIndex, 1);
    return res.status(204).json({
        message: 'Gemstone deleted successfully'
    });

};

export const getBidsForGemstone = (req, res) => {
    const {gemstoneId} = req.params;
    const gemstone = gemstoneList.find(gem => gem.id === gemstoneId);

    if (!gemstone) {
        return res.status(404).json({error: {code: 404, message: "Gemstone not found."}});
    }

    // Mapping each bid to include the name of the user from user id
    const bidsWithUserNames = gemstone.bids.map(bid => {
        const user = userList.find(user => user.id === bid.userId);
        return {...bid, userName: user ? user.name : "Unknown Bidder"};
    });

    return res.status(200).json(bidsWithUserNames);
};

/**
 * Places a bid on a gemstone, updating its bid list if valid.
 * @param {Object} req - The HTTP request object containing the bid details in the body.
 * @param {Object} res - The HTTP response object used to confirm the bid or return errors.
 */
export const placeBidOnGemstone = (req, res) => {
    const {gemstoneId} = req.params;
    const {userId, amount} = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({error: {code: 400, message: "Invalid bid amount."}});
    }

    const gemstone = gemstoneList.find(gem => gem.id === gemstoneId);
    if (!gemstone) {
        return res.status(404).json({error: {code: 404, message: "Gemstone not found."}});
    }

    // Ensure the auction is still active
    const now = Date.now();
    const endDate = new Date(gemstone.endDate).getTime();
    if (now >= endDate) {
        return res.status(409).json({error: {code: 409, message: "The auction has ended."}});
    }

    // Validate bid amount (check if higher than the highest bid or the starting price)
    const highestBid = Math.max(0, ...gemstone.bids.map(bid => bid.amount));
    if (amount <= highestBid || amount <= gemstone.startingPrice) {
        return res.status(409).json({
            error: {
                code: 409,
                message: `Bid amount must be higher than ${
                    amount <= highestBid ? `the current highest bid of ${highestBid}` : `the starting price of ${gemstone.startingPrice}`
                }.`,
            },
            highestBid,
        });
    }

    const newBid = {
        id: uuid(),
        userId,
        amount
    };

    gemstone.bids.push(newBid);

    // Notify connected clients
    notifyBids(gemstoneId);

    return res.status(201).json({message: "Bid successfully placed.", id: newBid.id});
};

export const sseStream = (req, res) => {
    const {gemstoneId} = req.params;

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send an initial message
    res.write(`data: connected\n\n`);

    const clientId = Date.now();
    const client = {id: clientId, gemstoneId, res};
    sseClients.push(client);

    req.on('close', () => {
        sseClients = sseClients.filter(c => c.id !== clientId);
    });
};

/**
 * Sends Server-Sent Events (SSE) notifications to subscribed clients.
 * @param {string} gemstoneId - The ID of the gemstone whose bids have updated.
 */
export const notifyBids = (gemstoneId) => {
    sseClients.forEach(client => {
        if (client.gemstoneId === gemstoneId) {
            client.res.write(`event: bidUpdate\ndata: new bid placed\n\n`);
        }
    });
};