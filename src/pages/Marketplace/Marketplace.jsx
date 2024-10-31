import CategoryList from "./CategoryList ";

export default function Marketplace() {
  return (
    <div className="bg-white p-10 w-[85%] min-h-screen flex flex-col items-center  mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Select your Category</h1>
      <div className="w-full flex items-center justify-center">
        <CategoryList />
      </div>
    </div>
  );
}
