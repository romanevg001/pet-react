import { type IAction } from "@/models/todo.model";
import type { ICellData, IcsvParser } from "@/pages/ExcelPage/excelPage.model";
import { createSlice } from "@reduxjs/toolkit";

export const excelSlice = createSlice({
  name: "excel",
  initialState: { data: { rows: [], headerRules: [] } } as { data: IcsvParser },
  reducers: {
    setFileData(state, action: IAction<IcsvParser>) {
      state.data = action.payload;
    },

    setHeaderSettings(state, action: IAction<ICellData>) {
        state.data.headerRules[action.payload.position] = action.payload.rules;
    }
  },
});
