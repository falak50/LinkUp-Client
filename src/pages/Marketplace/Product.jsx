import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from 'react-router-dom';
import PrivateComents from './MarketplaceCom/PrivateComents';

const pathLink = "http://localhost:5000/images/";

const createThumbnailUrl = (originalUrl) => {
  return originalUrl.replace(/w=\d+/, 'w=100'); // Adjust width parameter to create a thumbnail
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageItems, setImageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(true); // State to track fullscreen mode

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
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }



  return (
   <>
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

  <h1 className="text-2xl font-bold">{product.title}</h1>
  <p className="text-sm text-gray-600">Posted on 01 Nov 9:34 pm, {product.location}</p>

  <ImageGallery 
    items={imageItems} 
    additionalClass="custom-image-gallery" 
    showFullscreenButton={false}
  />

  <div className="mt-4">
    <h2 className="text-3xl font-semibold py-4">Tk {product.priceAmount}</h2>
    <p className="text-gray-700"><strong>Condition:</strong> {product.condition}</p>
    <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
    <p className="text-gray-700"><strong>Model:</strong> {product.model}</p>
    <p className="text-gray-700"><strong>Edition:</strong> {product.edition}</p>
    <p className="text-gray-700"><strong>Authenticity:</strong> {product.authenticity}</p>
  </div>

  <div className="mt-4">
    <h3 className="text-lg font-semibold">Features:</h3>
    <ul className="list-disc list-inside text-gray-700">
      {product.features?.replace(/\. /g, ', ').split(', ').map((feature, index) => (
        <li key={index}>{feature.trim()}</li>
      ))}
    </ul>
  </div>

  <div className="mt-4">
    <h3 className="text-lg font-semibold">Description:</h3>
    <p className="text-gray-700">{product.description}</p>
  </div>

  <div className="mt-4">
    <h3 className="text-lg font-semibold">Specifications:</h3>
    <p className="text-gray-700">{product.specifications}</p>
  </div>
</div>
</div>


<PrivateComents post={product}></PrivateComents>
   
   </>
  );
};

export default Product;
