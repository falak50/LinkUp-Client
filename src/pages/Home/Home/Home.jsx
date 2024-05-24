
import MidHome from "./MidHome";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <div className=" p-4">
          <h2 className="text-lg font-bold">Div 1</h2>
          <p>Content for div 1</p>
        </div>
      </div>
      <div className="w-2/3">
      
        <MidHome></MidHome>


      </div>
      <div className="w-1/3">
        <div className=" p-4">
          <h2 className="text-lg font-bold">Div 3</h2>
          <p>Content for div 3 lorem1000</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
