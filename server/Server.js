var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var supplier     =   require("./models/mongo");
var consume     =   require("./models/consume");
var cors        =   require('cors');
var router      =   express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/supplier")
    .get(function(req,res){
        var response = {};
        supplier.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){

        var db = new supplier();
        var response = {};
        db.supplier = req.body.supplier;
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/supplier/:id")
    .get(function(req,res){
        var response = {};
        supplier.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })



router.route("/consume")
    .post(function(req,res){
        
        var condition = req.body.condition;
        var filter = {};
        
        for(var i in condition){
            if(i == 'lessThan'){
                filter['quantity'] = {$lt: parseInt(condition[i])};
            }else if(i == 'itemAlert'){
                if(condition[i]==true){
                    filter['quantity'] = {$lt: 9};
                }
            }else{
                filter[i] = condition[i];
            }
        }

        var response = {};
        consume.find(filter)
            .populate('supplier')
            .exec(function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

router.route("/consume/insert").post(function(req,res){
        var db = new consume();
        var response = {};
        db.supplier = req.body.supplier;
        db.item = req.body.item;
        db.noItem = req.body.noItem;
        db.quantity = req.body.quantity;
        db.uPrice = req.body.uPrice;
        db.note = req.body.note;
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

/*router.route("/consume/filter/:condition")
    .get(function(req,res){

        console.log('123', req.params.condition);

        var response = {};
        consume.findById({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })*/


router.route("/consume/:id")
    .get(function(req,res){

        var response = {};
        consume.find(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){

        var response = {};
        consume.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                
                for(var i in req.body){
                    data[i] = req.body[i];
                }
                
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        consume.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                consume.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
