import { getAuth } from "firebase/auth";
import MidHome from "./MidHome";

const Home = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('firebase user lol', user);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full lg:w-[55%]">
        <MidHome />
      </div>
    </div>
  );
};

export default Home;
