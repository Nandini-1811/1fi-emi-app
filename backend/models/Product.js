const mongoose = require('mongoose')

const emiPlanSchema = new mongoose.Schema(
    {
        tenureMonths : {type : Number , required : true},
        interestRate : {type : Number , required : true, default : 0},
        cashback : {type : Number , default : 0},
    },
    {_id : false}
);

const variantSchema = new mongoose.Schema({
    variantName : {type : String , required : true},
    attributes : {
        storage : String,
        color : String,
    },
    mrp : {type : Number, required : true},
    price : {type : Number , required:true},
    image : {type : String , required : true},
    stock : {type : Number , default : 10},
});

const productSchema = new mongoose.Schema(
    {
        name : {type : String , required : true},
        slug : {type : String , required : true, unique : true},
        brand : {type : String , required : true},
        category : {type : String , required : true},
        description : {type : String},
        variants : {type : [variantSchema] , required : true},
        emiPlanRules : {type : [emiPlanSchema] , required : true},
    },
    {timestamps : true}
);

module.exports = mongoose.model('Product',productSchema);