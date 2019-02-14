const cache = require('memory-cache');
const memCache = new cache.Cache();

let cacheMiddleware = duration => (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;
  let cacheContent = memCache.get(key);

  if (cacheContent) {
    return res.send(cacheContent);
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      memCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;
