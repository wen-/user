import { createSelector } from "reselect";

export const selectTest = state => state.test;

export const selectTestValue = createSelector(
    selectTest,
    test => test.data || 0,
);