import { Link } from "react-router-dom";

const categories = [
  { name: "Mobiles", ads: 64554, icon: "📱", pathname: "/mobiles" },
  { name: "Electronics", ads: 53577, icon: "💻", pathname: "/electronics" },
  { name: "Vehicles", ads: 32202, icon: "🚗", pathname: "/vehicles" },
  { name: "Property", ads: 18546, icon: "🏠", pathname: "/property" },
  { name: "Home & Living", ads: 17708, icon: "🛋️", pathname: "/home-living" },
  { name: "Pets & Animals", ads: 14368, icon: "🐾", pathname: "/pets-animals" },
  { name: "Women's Fashion & Beauty", ads: 8141, icon: "👗", pathname: "/womens-fashion-beauty" },
  { name: "Men's Fashion & Grooming", ads: 7938, icon: "👔", pathname: "/mens-fashion-grooming" },
  { name: "Hobbies, Sports & Kids", ads: 7312, icon: "⚽", pathname: "/hobbies-sports-kids" },
  { name: "Business & Industry", ads: 3208, icon: "🏢", pathname: "/business-industry" },
  { name: "Education", ads: 2873, icon: "📚", pathname: "/education" },
  { name: "Essentials", ads: 2691, icon: "🛒", pathname: "/essentials" },
  { name: "Services", ads: 778, icon: "🔧", pathname: "/services" },
  { name: "Agriculture", ads: 769, icon: "🌾", pathname: "/agriculture" },
  { name: "Jobs", ads: 733, icon: "💼", pathname: "/jobs" },
  { name: "Overseas Jobs", ads: 54, icon: "✈️", pathname: "/overseas-jobs" },
];

const CategoryList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category, index) => (
        <Link to={`/marketplace/category${category.pathname}`} key={index} className="flex items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition-all duration-200 ease-in-out">
          <span className="text-3xl mr-4">{category.icon}</span>
          <div>
            <h3 className="text-base font-semibold">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.ads} ads</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
