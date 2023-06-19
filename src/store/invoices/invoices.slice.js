import { createSlice } from "@reduxjs/toolkit";

export const { actions: invoicesActions, reducer: invoicesReducer } =
  createSlice({
    name: "invoices",
    initialState: {
      list: null,
      loading: false,
      error: null,
      currentInvoice: null,
      paidStatus: false,
    },
    reducers: {
      setList: (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      },
      setLoading: (state, { payload }) => {
        state.loading = payload;
      },
      setError: (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      },
      addInvoice: (state, { payload }) => {
        if (state.list) {
          state.list = [...state.list, payload];
        }
      },
      setDeletingInvoice: (state, { payload }) => {
        const list = state.list;
        const index = list.findIndex((item) => item.id === payload);
        state.list = [...list.slice(0, index), ...list.slice(index + 1)];
      },
      setCurrentInvoice: (state, { payload }) => {
        state.currentInvoice = payload;
      },
      setEditingInvoice: (state, { payload }) => {
        const list = state.list;
        if (list) {
          const editIndex = list.findIndex((item) => item.id === payload.id);
          state.list = [
            ...list.slice(0, editIndex),
            payload,
            ...list.slice(editIndex + 1),
          ];
        }
      },
      setPayingInvoice: (state, { payload }) => {
        state.paidStatus = payload;
      },
    },
  });
