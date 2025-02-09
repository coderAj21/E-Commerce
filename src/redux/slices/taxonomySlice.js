import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APISERVICES from "../../config/api-services";

const taxonomySlice = createSlice({
  name: "taxonomy",
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxonomy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  },
});

export const fetchTaxonomy = createAsyncThunk(
  "taxonomy/fetchTaxonomy",
  async (_, { rejectWithValue }) => {
    try {
      let res = await APISERVICES.taxonomy.get();
      if (res?.success) {
        return res?.data;
      }
      return rejectWithValue("API call unsuccessful");
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch Taxonomy..");
    }
  }
);

export default taxonomySlice.reducer;
