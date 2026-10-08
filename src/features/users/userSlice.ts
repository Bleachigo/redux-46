import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UserState {
  current: User | null;
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  current: null,
  status: 'idle',
  error: null,
};

export const fetchUserById = createAsyncThunk<User, string>(
  'user/fetchUserById',
  async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) {
      throw new Error(`User not found ( status ${res.status} )`);
    }
    return (await res.json()) as User;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.current = null;
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
