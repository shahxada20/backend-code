const logger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} request received at: ${req.url}`);
    
    next(); 
};

module.exports = logger;