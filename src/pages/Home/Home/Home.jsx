
import MidHome from "./MidHome";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <div className=" p-4">
          <h2 className="text-lg font-bold">Div 1</h2>
          <p>Content for div 1</p>
        </div>
      </div>
      <div className="w-[55%]">
      
        <MidHome></MidHome>


      </div>
     
    </div>
  );
};

export default Home;
