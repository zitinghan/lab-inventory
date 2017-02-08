var mongoose    =   require("mongoose");

var consumeSchema  = {
    "supplier" : String,
    "item" : String,
    "noItem" : String,
    "quantity" : String,
    "uPrice" : String,
    "note" : String
};
module.exports = mongoose.model('consume', consumeSchema);;