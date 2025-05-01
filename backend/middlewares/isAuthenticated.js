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

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.id = decoded.userId;
            next();
        } catch (jwtError) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            message: "Authentication error",
            success: false,
            error: error.message
        });
    }
};

export default isAuthenticated;