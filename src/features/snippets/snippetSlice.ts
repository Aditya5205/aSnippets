import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface snippetType {
  id: string;
  key: string;
  value: string;
}

const initialState: {
  snippets: Array<snippetType>;
} = {
  snippets: [],
};

export const snippetSlice = createSlice({
  name: "text_snippet",
  initialState,
  reducers: {
    addSnippet: (
      state,
      action: PayloadAction<{
        key: string;
        value: string;
      }>,
    ) => {
      const newSnippet: snippetType = {
        id: nanoid(),
        key: action.payload.key,
        value: action.payload.value,
      };
      state.snippets.push(newSnippet);
    },
    deleteSnippet: (state, action: PayloadAction<string>) => {
      state.snippets = state.snippets.filter(
        (item) => item.id !== action.payload,
      );
    },
    updateSnippet: (state, action: PayloadAction<snippetType>) => {
      state.snippets.map((item) =>
        item.id === action.payload.id
          ? ((item.key = action.payload.key),
            (item.value = action.payload.value))
          : item,
      );
    },
  },
});

export const { addSnippet, deleteSnippet, updateSnippet } =
  snippetSlice.actions;

export default snippetSlice.reducer;
