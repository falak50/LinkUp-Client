import { useState } from "react";
import ConnectionList from "./ConnectionList";
import ManageConnections from "./ManageConnections";
export default function MyNetwork() {
  const [isConnetion, setIsConnetion] = useState(true);
  return (
    <div className=" mt-2 gap-4">
      <div className="p-4 bg-white rounded-lg w-[77%]">
        <nav className="flex space-x-4 mt-2 text-gray-500">
          <button
            onClick={() => setIsConnetion(true)}
            className={`pb-1 font-semibold text-xl ${
              isConnetion
                ? "text-black border-b-2 border-black"
                : "hover:text-black"
            }`}
          >
            Connections
          </button>
          <button
            onClick={() => setIsConnetion(false)}
            className={`pb-1 font-semibold text-xl ${
              !isConnetion
                ? "text-black border-b-2 border-black"
                : "hover:text-black"
            }`}
          >
            Manage Connections
          </button>
        </nav>
      </div>

      {isConnetion && <ConnectionList></ConnectionList>}
      {!isConnetion && <ManageConnections></ManageConnections>}
    </div>
  );
}
