const {nanoid} = require("nanoid");
const URL = require("../model/url");

async function handleGenrateNewShortURL(req, res) {
  const url = req.body.url;

  if (!url) {
    return res.render("index", { shortUrl: null, error: "URL is required" });
  }

  const shortId = nanoid(8);
  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });
  return res.render("home",{
    shortID : shortId
  })
}


async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
         totalClicks: result.visitHistory.length,
         analytics: result.visitHistory,
    })
}
async function handleShortURL(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push :{
            visitHistory : {
                timestamp : Date.now(),
            }
        },
    }
    );
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenrateNewShortURL,
    handleGetAnalytics,
    handleShortURL,
}