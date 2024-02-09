import { User_Status, User_Type } from "@/models/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: User_Type | null;
} = {
  user: null,
};

export const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlices.actions;

export default userSlices.reducer;
