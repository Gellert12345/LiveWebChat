import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    //ha semmi sincs(kesobb csinald meg specifkusabbra !!!!
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all required fields");
    }
    //email findOne => mert uniqe(elsődleges kulcs)
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// api/user?search=gellert
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}},
        ] // $or => ha 2 vagy több érték közül bármelyik is igaz akkor igaz lesz
    }: {}; // else ne törtöénjen semmi ezt jelenti

    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users);
})


export { registerUser, authUser , allUsers };