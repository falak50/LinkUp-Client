import { Button, Spin } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const pathLink = "http://localhost:5000/images/";

export default function Category() {
  const navigate = useNavigate(); // Hook to access navigation
  const [title, setTitle] = useState(''); // State for job title
  const [location, setLocation] = useState(''); // State for location
  const [products, setProducts] = useState([]);
  const owner = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { path } = useParams();

  // Debounced function to fetch products based on title and location
  const fetchProducts = useCallback(debounce(async (page) => {
    // setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/products/category/${path}`, {
        params: { 
          page: page,
          title: title,      // Include title in the query parameters
          location: location  // Include location in the query parameters
        },
      });
    console.log('response.data',response.data)
      if (page === 1) {
        setProducts(response.data); // Replace products on the first load or reset
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.data]); // Append products for subsequent loads
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, 500), [path, title, location]); // Delay of 300 milliseconds

  useEffect(() => {
    fetchProducts(page); // Call the debounced fetch function
  }, [fetchProducts, page]); // Run fetchProducts when page changes

  const handleProductClick = (productId) => {
    navigate(`/marketplace/product/${productId}`);
  };

  const handleBack = () => {
    navigate('/marketplace'); // Navigate to the marketplace page
  };

  // Update title and location state, triggering the debounced fetch
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    fetchProducts(page); // Call the debounced function when title changes
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    fetchProducts(page); // Call the debounced function when location changes
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex rounded-lg shadow-lg border bg-white">
        <div className="p-4 w-full">
          <div className="flex flex-col md:flex-row items-center mb-4"> {/* Flex container for button and title */}
            <div className="flex items-center mb-2 md:mb-0">
              <Button onClick={handleBack} className="flex items-center mr-1"> {/* Added margin for spacing */}
                <IoIosArrowBack className="mr-1" />Back {/* Added margin for icon */}
              </Button>
              <h2 className="text-xl font-semibold pr-10">Products</h2>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 flex-1"> {/* Responsive search inputs */}
              <input
                type="text"
                value={title}
                onChange={handleTitleChange} // Update title with debounced function
                className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 mb-2 md:mb-0 w-full md:w-1/2 focus:outline-none"
                placeholder="Product Name"
              />
              <input
                type="text"
                value={location}
                onChange={handleLocationChange} // Update location with debounced function
                className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 w-full md:w-1/2 focus:outline-none"
                placeholder="Location"
              />
            </div>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div 
                onClick={() => handleProductClick(product._id)}
                key={index} className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row">
                <img
                  src={pathLink + product?.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-500">{product.location}</p>
                  <p className="text-green-500">{product.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Tk {product.priceAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
