import { useState } from 'react';
import PostSectionHome from './PostSectionHome';
import FriendsPost from './FriendsPost';
import PublicPost from './PublicPost';

const MidHome = () => {
    const [resetCount, setResetCount] = useState(0);
    const [isPublic, setIsPublic] = useState(true);

    return (
        <div className='shadow-md '>
            {/* Post section */}
            <PostSectionHome setResetCount={setResetCount}></PostSectionHome>


            {/* <div className="p-4 w-[100%] bg-white rounded-lg">
                <nav className="flex space-x-4 mt-2 text-gray-500">
                    <button
                        onClick={() => setIsPublic(true)}
                        className={`pb-1 font-semibold ${
                            isPublic
                                ? 'text-green-600 border-b-2 border-green-600' // Active state
                                : 'hover:text-green-600' // Inactive state with hover effect
                        }`}>
                        Public Feed
                    </button>

                    <button
                        onClick={() => setIsPublic(false)}
                        className={`pb-1 font-semibold ${
                            !isPublic
                                ? 'text-green-600 border-b-2 border-green-600' // Active state
                                : 'hover:text-green-600' // Inactive state with hover effect
                        }`}>
                        Friends Feed
                    </button>
                </nav>
            </div> */}

            {/* Conditionally render based on isPublic */}
            {!isPublic ? (
                <FriendsPost resetCount={resetCount} setResetCount={setResetCount}></FriendsPost>
            ) : (
                <PublicPost resetCount={resetCount} setResetCount={setResetCount}></PublicPost>
            )}
        </div>
    );
};

export default MidHome;
