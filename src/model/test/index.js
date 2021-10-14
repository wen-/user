import { createSliceWithSaga } from 'redux-toolkit-with-saga';
import {put, call} from 'redux-saga/effects';
import { fetchData } from './api';

const initialState = {data: 123};

const testSliceWithSaga = createSliceWithSaga({
    name: 'test',
    initialState,
    reducers: {
        getTestStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getTestSuccess(state, { payload }) {
            state.data = payload;
        },
        getTestFailure(state, { payload }) {
            state.isLoading = false;
            state.error = payload;
        },
        add(state){
            state.data++;
        },
        reduce(state){
            state.data--;
        }
    },
    effects: {
        * fetchTestList({ payload }) {
            const { store } = require('../../app/reduxConfig');
            const s = store.getState();
            console.log(s);
            yield put({ type: 'test/getTestStart' });
            try {
                const result = yield call(fetchData, payload);
                yield put({
                    type: 'test/getTestSuccess',
                    payload: result
                });
            } catch (err) {
                yield put({
                    type: 'test/getTestFailure',
                    payload: err.toString()
                });
            }
        }
    }
});

export const {
    add,
    reduce,
    getTestStart,
    getTestSuccess,
    getTestFailure
} = testSliceWithSaga.actions;

export const {
    fetchTestList
} = testSliceWithSaga.effectActions;

export const testCallEffects = testSliceWithSaga.callEffects;

export default testSliceWithSaga.reducer;
