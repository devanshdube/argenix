const requestMap = new Map();

export default (limit = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!requestMap.has(ip)) {
      requestMap.set(ip, []);
    }

    const timestamps = requestMap
      .get(ip)
      .filter(time => currentTime - time < windowMs);

    timestamps.push(currentTime);
    requestMap.set(ip, timestamps);

    if (timestamps.length > limit) {
      return res.status(429).json({
        message: "Too many requests"
      });
    }

    next();
  };
};
