import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        /*
        * token igy néz ki Bearer as321dadsdadsads
        * ezert megnézük hogy az első szo Bearer és utánna meg splitejuk
        * és a const tokent egyenlővé teszük a 2. szoval(a rendes tokenel[1])
        */

    ) {
        try {
            token = req.headers.authorization.split( " " )[1];

            //decodolni a tokeneket!
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized,token falid");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})
