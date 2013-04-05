
/*
 * GET users listing.
 */

exports.countSignatories = function(req, res){
    var actName = req.params.actName;

    req.models.act.find({name:actName}, function(err, act){
        act[0].getSignatories().count(function (err, count) {
            res.send(JSON.stringify({count:count}));
        });
    });

};

exports.getSignatoriesShortList = function (req, res) {
    var actName = req.params.actName;
    req.models.act.find({name:actName}, function(err, act){
        act[0].getSignatories(function (err, count) {
            res.send(JSON.stringify({signatories:count}));
        });
    });

};