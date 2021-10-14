import { createRootSaga } from 'redux-toolkit-with-saga';
import {testCallEffects} from '../model/test';

export default createRootSaga([
    testCallEffects
]);
