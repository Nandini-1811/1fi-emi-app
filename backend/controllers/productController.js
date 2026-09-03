const Product = require('../models/Product')
const {calculateEMI} = require('../utils/emiCalculator')

const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find({} , 'name slug brand variants.image variants.price variants.mrp');
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({message : 'Failed to fetch products', error : err.message});
    }
};

const getProductBySlug = async (req,res) => {
    try{
        const product = await Product.findOne({slug : req.params.slug});
        if(!product){
            return res.status(404).json({message : 'Product not found'});
        }

        const variantsWithEMI = product.variants.map((variant) => {
            const emiPlans = product.emiPlanRules.map((rule) => ({
                tenureMonths : rule.tenureMonths,
                interestRate : rule.interestRate,
                cashback : rule.cashback,
                monthlyAmount : calculateEMI(variant.price, rule.tenureMonths,rule.interestRate),

            }));

            return {
                variantName  : variant.variantName,
                attributes : variant.attributes,
                mrp : variant.mrp,
                price : variant.price,
                image : variant.image,
                stock : variant.stock,
                emiPlans,
            };
        });

        return res.status(200).json({
            name : product.name,
            slug : product.slug,
            brand : product.brand,
            category : product.category,
            description : product.description,
            variants : variantsWithEMI,
        });
    } 
    catch(err){
        res.status(500).json({message : 'Failed to fetch product',error : err.message});
    }
};

module.exports = {getAllProducts , getProductBySlug};