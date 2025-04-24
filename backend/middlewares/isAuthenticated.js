import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login.",
                success: false,
            });
        }

        try {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            req.id = decoded.userId;
            next();
        } catch (jwtError) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Authentication error",
            success: false,
            error: error.message
        });
    }
}

export default isAuthenticated;