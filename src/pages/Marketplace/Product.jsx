
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL

  return (
    <div>
      <h1>Product ID: {id}</h1>
      {/* Fetch and display product details based on the ID */}
    </div>
  );
};

export default Product;
