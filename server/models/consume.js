var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;
var consumeSchema  = {
    "supplier" : {type: mongoSchema.Types.ObjectId, ref: 'supplier'},
    "item" : String,
    "noItem" : Number,
    "quantity" : Number,
    "uPrice" : Number,
    "note" : String
};
module.exports = mongoose.model('consume', consumeSchema);;