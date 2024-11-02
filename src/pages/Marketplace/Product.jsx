import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

// Function to create a thumbnail URL from the original image URL
const createThumbnailUrl = (originalUrl) => {
  return originalUrl.replace(/w=\d+/, 'w=100'); // Replace width parameter to create a thumbnail
};

// Product object definition
const product = {
  title: "Samsung Galaxy S20 Ultra - 12/256GB 5G",
  category: "Mobile Phones",
  categoryCode : 'mobiles',
  location: "Dhaka, Bangladesh",
  condition: "Used",
  brand: "Samsung",
  model: "Galaxy S20 Ultra",
  edition: "12/256GB 5G",
  authenticity: "Original",
  features: "4G . 5G .     Micro SIM . USB Type-C Port, Fast Charging, Flash Charging, Android, Expandable Memory, 12 GB RAM, Dual Camera, Triple Camera, Dual LED Flash, Quad LED Flash, Bluetooth, WiFi, GPS, Fingerprint Sensor, Infrared Port",
  description: "Fresh set. No scratch. Like new looking.",
  specifications: "RAM: 12 GB, Internal Storage: 256 GB, 5G Version, Main Camera: 108 MP, Zoom: 100X, Front Camera: 40 MP, Latest updated version",
  additionalNote: "Only Set & Cash memo will be given.",
  price: "Fixed",
  priceAmount: 75000, // assuming the price is 75,000 in the relevant currency
  status : "Available",
  images: [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=60'
  ]
};

// Prepare images for ImageGallery
const imageItems = product.images.map((image) => ({
  original: image,
  thumbnail: createThumbnailUrl(image),
}));

const Product = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg"> {/* Card styling */}
      {/* Product Title and Posting Info */}
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-600">Posted on 01 Nov 9:34 pm, {product.location}</p>

      {/* Image Gallery */}
      <ImageGallery items={imageItems} />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Tk {product.priceAmount}</h2>
        <p className="text-gray-700"><strong>Condition:</strong> {product.condition}</p>
        <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
        <p className="text-gray-700"><strong>Model:</strong> {product.model}</p>
        <p className="text-gray-700"><strong>Edition:</strong> {product.edition}</p>
        <p className="text-gray-700"><strong>Authenticity:</strong> {product.authenticity}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Features:</h3>
        <ul className="list-disc list-inside text-gray-700">
        {product.features
      .replace(/\. /g, ', ') // Replace periods followed by a space with a comma and a space
      .split(', ') // Split by comma
      .map((feature, index) => (
        <li key={index}>{feature.trim()}</li> // Trim whitespace for each feature
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

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Additional Note:</h3>
        <p className="text-gray-700">{product.additionalNote}</p>
      </div>
    </div>
  );
};

export default Product;
