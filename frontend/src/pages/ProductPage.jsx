import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/productApi";

const colorSwatchMap = {
    Silver: '#e5e5e5',
    Orange: '#d9622b',
    'Deep Blue': '#3a4a6b',
    Lavender: '#c9b8e0',
    Pistachio: '#a8bfa0',
    Graphite: '#4a4a4a',
    'Sand Storm': '#d8cba8',
    'Infinity Black': '#1a1a1a',
};

function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductBySlug(slug);
                setProduct(data);
                setSelectedStorage(data.variants[0].attributes.storage);
                setSelectedColor(data.variants[0].attributes.color);
            } catch (err) {
                setError('Product not found.');
            }
            finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [slug]);


    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }
    const storageOptions = [...new Set(product.variants.map((v) => v.attributes.storage))];
    const colorOptions = [...new Set(product.variants.map((v) => v.attributes.color))];

    const variant =
        product.variants.find(
            (v) => v.attributes.storage === selectedStorage && v.attributes.color === selectedColor
        ) || product.variants[0];

    const handleStorageChange = (storage) => {
        const match = product.variants.find(
            (v) => v.attributes.storage === storage && v.attributes.color === selectedColor
        );
        setSelectedStorage(storage);
        if (!match) {
            setSelectedColor(product.variants.find((v) => v.attributes.storage === storage).attributes.color);
        }
        setSelectedPlanIndex(null);
    };

    const handleColorChange = (color) => {
        const match = product.variants.find(
            (v) => v.attributes.storage === selectedStorage && v.attributes.color === color
        );
        setSelectedColor(color);
        if (!match) {
            setSelectedStorage(product.variants.find((v) => v.attributes.color === color).attributes.storage);
        }
        setSelectedPlanIndex(null);
    };

    const handleProceed = () => {
        const plan = variant.emiPlans[selectedPlanIndex];
        alert(
            `Proceeding with ${product.name} (${variant.variantName}) on a ${plan.tenureMonths}-month plan at ₹${plan.monthlyAmount.toLocaleString('en-IN')}/month.`
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Link to="/" className="text-lg text-gray-500 hover:text-black inline-block mb-4">
                ← Back to products
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={variant.image}
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-lg"
                    />

                    <p className="text-red-500 text-sm font-semibold mt-4">NEW</p>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 mb-2">{variant.variantName}</p>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold">₹{variant.price.toLocaleString('en-IN')}</span>
                        <span className="text-gray-400 line-through">₹{variant.mrp.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Variant</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                        {storageOptions.length > 1 && (
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-1">Storage</p>
                                <div className="flex gap-2 flex-wrap">
                                    {storageOptions.map((storage) => (
                                        <button
                                            key={storage}
                                            onClick={() => handleStorageChange(storage)}
                                            className={`px-3 py-1 border rounded text-sm ${storage === selectedStorage
                                                ? 'border-black bg-black text-white'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            {storage}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {colorOptions.length > 1 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Color</p>
                                <div className="flex gap-2 flex-wrap">
                                    {colorOptions.length > 1 && (
                                        <div className="mb-4">
                                            <div className="flex gap-3">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => handleColorChange(color)}
                                                        title={color}
                                                        style={{ backgroundColor: colorSwatchMap[color] || '#ccc' }}
                                                        className={`w-7 h-7 rounded-full border-2 ${color === selectedColor ? 'border-black' : 'border-gray-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm">{product.description}</p>
                </div>



                <div className="mb-4">
                    <p className="text-xl text-gray-900 mb-2">EMI plans backed by mutual funds</p>
                    <div className="flex flex-col gap-2">
                        {variant.emiPlans.map((plan, index) => (
                            <label
                                key={plan.tenureMonths}
                                className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer ${index === selectedPlanIndex ? 'border-black' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="emiPlan"
                                        checked={index === selectedPlanIndex}
                                        onChange={() => setSelectedPlanIndex(index)}
                                    />
                                    <div>
                                        <p className="font-medium">
                                            ₹{plan.monthlyAmount.toLocaleString('en-IN')} x {plan.tenureMonths} months
                                        </p>
                                        {plan.cashback > 0 && (
                                            <p className="text-green-600 text-sm">
                                                Additional cashback of ₹{plan.cashback.toLocaleString('en-IN')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                                </span>
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleProceed}
                        disabled={selectedPlanIndex === null}
                        className={`w-full py-3 mt-4 rounded-lg font-semibold ${selectedPlanIndex === null
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-black text-white'
                            }`}
                    >
                        {selectedPlanIndex === null ? 'Select a plan to proceed' : 'Proceed with this plan'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;