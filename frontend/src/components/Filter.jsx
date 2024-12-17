import { Link } from "react-router-dom";

const Filter = () => {
  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">Filter</p>
      <div className="mb-4">
        <Link to="/skillForm">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out">
            Enter Skill Form for AI Analysis
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Filter;
