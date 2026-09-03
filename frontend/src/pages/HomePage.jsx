import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../api/productApi";

function HomePage(){
    const [products,setProducts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect( () => {
        const loadProducts = async () => {
            try{
                const data = await fetchAllProducts();
                setProducts(data);
            }
            catch(err){
                setError('Failed to load products');
            }
            finally{
                setLoading(false);
            }
        };
        loadProducts();
    },[]);

    if(loading){
        return <p className="text-center mt-10 text-gray-500">Loading products...</p>
    }
    if(error){
        return <p className="text-center mt-10 text-red-500">{error}</p>
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Shop on EMI</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product._id}
                        to={`/products/${product.slug}`}
                        className="border rounded-lg p-4 hover:shadow-lg transition"
                    >
                        <img 
                            src={product.variants[0].image} 
                            alt={product.name} 
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600">₹{product.variants[0].price.toLocaleString('en-IN')}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;