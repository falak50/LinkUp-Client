import { Avatar, List } from "antd";
import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
const defaultImage = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';
export default function ChatList({ friends, handleClick }) {
  const { curUser } = useContext(AuthContext);
  const [openList, setOpenList] = useState(false);
  const getImageUrl = (imageURL) => {
    return imageURL ? `http://localhost:5000/images/${imageURL}` : defaultImage;
  };
  return (
    <div className="fixed bottom-0 right-0 m-4 w-[365px] max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Start */}
      <div
      onClick={()=>setOpenList(!openList)}
      className="flex items-center justify-between bg-white text-black p-3 ">
        <div className="flex items-center">
          <div className="avatar online">
            <div className="w-10 rounded-full">
              {/* Reduce the image size by using w-10 instead of w-14 */}
              <img  src={getImageUrl(curUser?.ProfileImgURL)}/>
            </div>
          </div>
          {/* Add spacing between the image and text */}
          <h1 className="text-lg font-semibold ml-3">Messaging...</h1>
        </div>
        {!openList &&
          <FaChevronUp onClick={()=>setOpenList(!openList)} />
        }
        {openList &&
          <FaChevronDown  onClick={()=>setOpenList(!openList)} />
        }
        
      </div>
      <hr />
      <hr />
      {/* Header End */}
      {openList && (
        <div
          id="scrollableDiv"
          className="h-96 overflow-auto p-4 border-b border-gray-300 bg-gray-50"
        >
          <List
            dataSource={friends}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleClick(item)}
                key={item._id}
                className="cursor-pointer hover:bg-blue-100 transition-colors duration-200"
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`http://localhost:5000/images/${item.ProfileImgURL}`}
                    />
                  }
                  title={`${item?.first_name} ${item?.last_name}`}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}
