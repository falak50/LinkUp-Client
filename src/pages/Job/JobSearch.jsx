import { FaSearch } from 'react-icons/fa';
import Job from './Job';
export default function JobSearch({ handleSearch, title, setTitle, location, setLocation, workType, setWorkType ,setList }) {
    return (
        <div className="bg-white rounded-lg mx-2 p-2">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <h1 className="text-gray-800 text-2xl font-semibold">Job Search</h1>
                <div className="flex flex-1 items-center space-x-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs bg-[#edf3f8]"
                        placeholder="Job Title"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs bg-[#edf3f8]"
                        placeholder="Location"
                    />
                    <select
                        value={workType}
                        onChange={(e) => setWorkType(e.target.value)}
                        className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs bg-[#edf3f8]"
                    >
                        <option value="">Any</option>
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                    </select>
                    <button
    onClick={handleSearch}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 hover:bg-blue-70"
>
    <FaSearch /> 
    <span>Search</span>
</button>
                  <Job setList={setList}></Job>
                </div>
            </div>
        </div>
    );
}
