import { AppState } from '@/lib/redux/store';
import { RevenueGroup } from '@/types/revenueGroup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RevenueGroupState = {
  revenueGroupList: Array<RevenueGroup>;
};

const initialState: RevenueGroupState = {
  revenueGroupList: [],
};

export const revenueGroup = createSlice({
  name: 'revenueGroup',
  initialState,
  reducers: {
    reset: () => initialState,
    setRevenueGroupList: (
      state,
      action: PayloadAction<Array<RevenueGroup>>
    ) => {
      state.revenueGroupList = action.payload;
    },
    appendRevenueGroup: (state, action: PayloadAction<RevenueGroup>) => {
      state.revenueGroupList.push({
        ...action.payload,
        id: state.revenueGroupList.length,
      });
    },
    removeRevenueGroup: (state, action: PayloadAction<number>) => {
      const removeId = action.payload;
      state.revenueGroupList = state.revenueGroupList.filter(
        (revenueGroup) => revenueGroup.id !== removeId
      );
    },
    updateRevenueGroup: (
      state,
      action: PayloadAction<{ groupId: number; revenueGroup: RevenueGroup }>
    ) => {
      const { groupId, revenueGroup } = action.payload;
      state.revenueGroupList = state.revenueGroupList.map((item) =>
        item.id === groupId ? revenueGroup : item
      );
    },
    removeRuleForRevenueGroup: (
      state,
      action: PayloadAction<{ groupId: number; ruleId: number }>
    ) => {
      const { groupId, ruleId } = action.payload;
      console.log(
        state.revenueGroupList.length,
        state.revenueGroupList[groupId]?.rules.length,
        groupId,
        ruleId
      );
      const revenueGroup = state.revenueGroupList[groupId];
      if (!revenueGroup) return;
      revenueGroup.rules = revenueGroup.rules.filter(
        (rule) => rule.id !== ruleId
      );
    },
  },
});

export const selectRevenueGroupList = (state: AppState) =>
  state.revenueGroupReducer.revenueGroupList;

export const {
  reset,
  appendRevenueGroup,
  removeRevenueGroup,
  removeRuleForRevenueGroup,
  setRevenueGroupList,
  updateRevenueGroup,
} = revenueGroup.actions;

const revenueGroupReducer = revenueGroup.reducer;

export default revenueGroupReducer;
