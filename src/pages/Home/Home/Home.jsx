import { Helmet } from 'react-helmet-async';
const Home = () => {
    // console.log("check",import.meta.env.VITE_apiKey);
    return (
        <div>
            <Helmet>
                <title>LinkUp</title>
            </Helmet>
           <h2>this is Home</h2> 
        </div>
    );
};

export default Home;