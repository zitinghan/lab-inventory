var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;
var microbiologySchema  = {
    "supplier" : {type: mongoSchema.Types.ObjectId, ref: 'supplier'},
    "item" : String,
    "noItem" : Number,
    "quantity" : Number,
    "location" : String,
    "note" : String,
    "updateDate": { type: Date, default: Date.now },
    "insertDate": { type: Date, default: Date.now }
};
module.exports = mongoose.model('microbiology', microbiologySchema);;