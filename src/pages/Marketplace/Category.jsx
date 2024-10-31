import { useParams } from "react-router-dom";

const Category = () => {
    const { path } = useParams(); // Get the category path from the URL
  
    return (
      <div>
        <h1>Category: {path}</h1>
        {/* Fetch and display ads based on the category */}
      </div>
    );
  };
  
  export default Category;