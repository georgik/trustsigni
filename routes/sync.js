
/*
 * GET users listing.
 */

exports.sync = function(req, res){
    req.db.sync();
    res.send("DB Sync");
};