const express = require("express");
const {handleGenrateNewShortURL , handleGetAnalytics , handleShortURL} = require("../controllers/url");
const router = express.Router();

router.post('/',handleGenrateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);
router.get('/:shortId',handleShortURL);
module.exports = router;