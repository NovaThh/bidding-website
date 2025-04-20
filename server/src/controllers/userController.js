import {userList, gemstoneList} from "../database/database.js";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import secret from "../utils/secret.js";


export const getUsers = (req, res) => {
    return res.status(200).json({userList});
};

export const getUserWithID = (req, res) => {
    const {userId} = req.params;
    const user = userList.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({
                "error": {
                    "code": 404,
                    "message": "No user found."
                }
            }
        );
    }
    return res.status(200).json(user);
};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            "error": {
                "code": 400,
                "message": "All fields are required."
            }
        });
    }

    const existingEmail = userList.find(user => user.email === email);
    const hashPassword = await bcrypt.hash(password, 7); //lucky number :D
    if (existingEmail) {
        return res.status(409).json({
            "error": {
                "code": 409,
                "message": "Bad credentials."
            }
        });
    }


    const newUser = {
        id: uuid(),
        name,
        email,
        hashPassword,
        isAdmin: false
    };
    userList.push(newUser);
    return res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });

};

export const logIn = async (req, res) => {
    const {email, password} = req.body;
    const user = userList.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashPassword);
    if (!isPasswordValid) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {id: user.id, name: user.name, isAdmin: user.isAdmin},
        secret,
        {expiresIn: '2h'}
    );

    return res.status(200).json({
        message: "User logged in successfully",
        token,
        userId: user.id
    });
};

export const getUserWins = (req, res) => {
    const {userId} = req.params;

    const user = userList.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({message: "User not found."});
    }

    const now = Date.now();
    gemstoneList.forEach(gem => {
        const endDate = new Date(gem.endDate).getTime();
        if (now >= endDate) {
            const highestBid = gem.bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max), {amount: 0});
            if (highestBid.userId === userId) {
                const alreadyWon = user.userWins.find(win => win.gemstoneName === gem.name);
                if (!alreadyWon) {
                    user.userWins.push({gemstoneName: gem.name, amount: highestBid.amount});
                }
            }
        }
    });

    const totalWinsValue = user.userWins.reduce((sum, win) => sum + win.amount, 0);
    return res.status(200).json({wins: user.userWins, totalWinsValue});
};