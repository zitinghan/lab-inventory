var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/labinventory');
var mongoSchema =   mongoose.Schema;


var supplierSchema  = {
    "supplier" : String
};


module.exports = mongoose.model('supplier',supplierSchema);;
