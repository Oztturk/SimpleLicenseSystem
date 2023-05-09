var genMiddleware = (req,res,next) => {
    const { body } = req;
    if (!body.hasOwnProperty("token")) return res.status(400).send("Missing Token")
    if (!body.hasOwnProperty("days")) return res.status(400).send("Missing days")
    next();
}

var CheckMiddleware = (req,res,next) => {
    const { body } = req;
    if (!body.hasOwnProperty("key")) return res.status(400).send("Missing key")
    next();
}
var adddaysMiddleware = (req,res,next) => {
    const { body } = req;
    if (!body.hasOwnProperty("key")) return res.status(400).send("Missing key")
    if (!body.hasOwnProperty("token")) return res.status(400).send("Missing Token")
    if (!body.hasOwnProperty("days")) return res.status(400).send("Missing days")
    next();
}

export {
    genMiddleware,
    CheckMiddleware,
    adddaysMiddleware
}