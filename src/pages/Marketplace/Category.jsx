import { Button, Spin } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const pathLink = "http://localhost:5000/images/"

// const products = [
//   { 
//     title: "Apple iPhone 7 Plus", 
//     location: "Dhaka", 
//     price: "12,500", 
//     condition: "Used", 
//     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=60"
//   },
//   { 
//     title: "Xiaomi Redmi Note 10 Pro Max", 
//     location: "Dhaka", 
//     price: "14,000", 
//     condition: "Used", 
//     image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=60"
//   },
//   { 
//     title: "Honor X9B", 
//     location: "Dhaka", 
//     price: "18,000", 
//     condition: "Used", 
//     image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=60"
//   }
// ];

export default function Category() {
  const navigate = useNavigate(); // Hook to access navigation
  const [title, setTitle] = useState(''); // State for job title
  const [location, setLocation] = useState(''); // State for location

  const handleBack = () => {
    navigate('/marketplace'); // Navigate to the marketplace page
  };


  const [products, setProducts] = useState([]);
  const owner = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { path } = useParams();
  // console.log('path ',path)
  // const categoryName = ''
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/products/category/${path}`, {
        params: { page: page }, // Pass the page number in the query parameters
      })
      .then((response) => {
        if (page === 1) {
          setProducts(response.data);  // Replace posts on the first load or reset
        } else {
          setProducts((prevPosts) => [...prevPosts, ...response.data]);  // Append posts for subsequent loads
        }
        setIsLoading(false);
        setIsMoreLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
        setIsMoreLoading(false);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/marketplace/product/${productId}`);
  };

  console.log('product',products[0])

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
              <h2 className="text-xl font-semibold pr-10
              ">Products</h2>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 flex-1"> {/* Responsive search inputs */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 mb-2 md:mb-0 w-full md:w-1/2 focus:outline-none"
                placeholder="Product Name"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                  src={pathLink+product?.images[0]}
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
