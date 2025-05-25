import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 6,
  search: "",
  status: "",
  priority: "",
  sort: "desc",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.page = 1;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPage,
  setSearch,
  setStatus,
  setPriority,
  setSort,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
