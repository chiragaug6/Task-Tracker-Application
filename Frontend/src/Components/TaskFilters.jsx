import { useDispatch, useSelector } from "react-redux";
import {
  setPriority,
  setSearch,
  setSort,
  setStatus,
} from "../Redux/Slices/filterSlice";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { search, status, priority, sort } = useSelector(
    (state) => state.filter
  );

  const resetFilters = () => {
    dispatch(setSearch(""));
    dispatch(setStatus(""));
    dispatch(setPriority(""));
    dispatch(setSort("desc"));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full">
      {/* Search Input */}
      <div className="flex-grow min-w-[200px] max-w-lg">
        <input
          type="text"
          placeholder="Search tasks..."
          className="input input-bordered w-full rounded-lg shadow-sm transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:shadow-md"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Status Filter */}
      <select
        className="select select-bordered w-36 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={status}
        onChange={(e) => dispatch(setStatus(e.target.value))}
      >
        <option value="">All Statuses</option>
        <option value="Completed">✅ Completed</option>
        <option value="Incomplete">❌ Incomplete</option>
      </select>

      {/* Priority Filter */}
      <select
        className="select select-bordered w-36 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={priority}
        onChange={(e) => dispatch(setPriority(e.target.value))}
      >
        <option value="">All Priorities</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">🌱 Low</option>
      </select>

      {/* Sort Filter */}
      <select
        className="select select-bordered w-36 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="desc"> Newest First</option>
        <option value="asc"> Oldest First</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="btn btn-secondary btn-outline hover:btn-secondary flex-shrink-0"
      >
        🔄 Reset Filters
      </button>
    </div>
  );
};

export default TaskFilters;
