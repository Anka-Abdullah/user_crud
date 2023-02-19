const apiKey = "HiJhvL$T27@1u^%u86g";

function apiKeyAuth(req, res, next) {
  const providedApiKey = req.headers.key;

  if (!providedApiKey) {
    return res.status(403).json({ error: "API key is missing." });
  }

  if (providedApiKey !== apiKey) {
    return res.status(401).json({error:"Invalid API key."});
  }

  next();
}

module.exports = apiKeyAuth
