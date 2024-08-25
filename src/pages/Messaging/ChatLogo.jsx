import { MdOutlineMessage } from "react-icons/md";

export default function ChatLogo() {
  return (
    <div className="flex justify-center items-center h-34">
      <MdOutlineMessage 
        className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        style={{ fontSize: '100px' }} // Adjust this value as needed
      />
    </div>
  );
}
