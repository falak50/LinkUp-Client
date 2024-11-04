import { Spin } from 'antd';
import axios from 'axios';
import  { useContext, useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from 'react-router-dom';
import PrivateComents from './MarketplaceCom/PrivateComents';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
const pathLink = "http://localhost:5000/images/";
import SellPost from "./MarketplaceCom/SellPost";
import EditSellPost from './MarketplaceCom/EditSellPost';
import { timeAgo } from "../Home/Home/utils";
import { useNavigate } from 'react-router-dom';

const createThumbnailUrl = (originalUrl) => {
  return originalUrl.replace(/w=\d+/, 'w=100'); // Adjust width parameter to create a thumbnail
};

const Product = () => {
  const { curUser } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageItems, setImageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const [timeAgoText,setTimeAgoText] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/products/product/${id}`)
      .then((response) => {
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);

        const images = fetchedProduct.images.map((image) => ({
          original: pathLink + image,
          thumbnail: createThumbnailUrl(pathLink + image),
        }));
        setImageItems(images);
        setIsLoading(false);
        if(fetchedProduct?.createdAt){
        const str = timeAgo(fetchedProduct?.createdAt);
        setTimeAgoText(str);
        console.log('str ',str)
      }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      });
  }, [id,open]);

  const handleDeletePost = () => {
    const pathname = product.category;

    console.log('pathname',pathname);
    // return
    // /marketplace/category/${category.pathname}`
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // return
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:5000/products/deleteSellPost/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            navigate(`/marketplace/category/${pathname}`);
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

console.log('pro ',product?.uid)
console.log('pro cur ',curUser?._id)
console.log('time ',product)
console.log('str 2',timeAgoText)
  return (
   <>
   <EditSellPost open={open} setOpen={setOpen} product={product}></EditSellPost>
   <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
<div >
  <style>
    {`
       .custom-image-gallery .image-gallery-slide img {
        max-height: 400px !important; /* Adjust this value as needed */
        object-fit: contain !important; /* This maintains the aspect ratio */
      }
    `}
  </style>

<dir>
<div className='flex justify-between items-center '>
<div>
  <h1 className="text-2xl font-bold">{product?.title}</h1>
  <p className="text-sm text-gray-600">{timeAgoText} {product.location}</p>
</div>
  <div>
  {product?.uid === curUser?._id && (
            <div className="flex-none ml-4">
              <div className="" ref={dropdownRef}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost avatar text-gray-500"
                  onClick={toggleDropdown}
                >
                  <MoreVertIcon />
                </div>
                {isOpen && (
                  <ul
                    className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
                    onClick={closeDropdown}
                  >
                    <li onClick={() => setOpen(true)}>
                      <span className="justify-between">Edit</span>
                      {/* <SellPost></SellPost> */}
                    </li>
                    <li onClick={handleDeletePost}>
                      <span>Delete</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
  </div>
</div>
  
</dir>

  {/* need dyanmic date editProblem may be ocucur*/}
  {/* <br />
  <br />
  <br /><br />
  <br /> */}
  <ImageGallery 
    items={imageItems} 
    additionalClass="custom-image-gallery" 
    showFullscreenButton={false}
  />

  <div className="mt-4 px-4">
    <h2 className="text-3xl font-semibold py-4">Tk {product.priceAmount}</h2>
    <p className="text-gray-700"><strong>Condition:</strong> {product.condition}</p>
    <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
    <p className="text-gray-700"><strong>Model:</strong> {product.model}</p>
    <p className="text-gray-700"><strong>Edition:</strong> {product.edition}</p>
    <p className="text-gray-700"><strong>Authenticity:</strong> {product.authenticity}</p>
  </div>

  <div className="mt-4 px-4">
    <h3 className="text-lg font-semibold">Features:</h3>
    <ul className="list-disc list-inside text-gray-700">
      {product.features?.replace(/\. /g, ', ').split(', ').map((feature, index) => (
        <li key={index}>{feature.trim()}</li>
      ))}
    </ul>
  </div>

  <div className="mt-4 px-4">
    <h3 className="text-lg font-semibold">Description:</h3>
    <p className="text-gray-700">{product.description}</p>
  </div>

  <div className="mt-4 px-4">
    <h3 className="text-lg font-semibold">Specifications:</h3>
    <p className="text-gray-700 " style={{ whiteSpace: "pre-line" }}>{product.specifications}</p>
    
  </div>
</div>
</div>


<PrivateComents post={product}></PrivateComents>
   
   </>
  );
};

export default Product;
