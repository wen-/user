import { url } from '../../config/url';
import {doGet, doPost} from '../../utils/fetch';

export async function fetchData(params) {
    return await doGet(url.test, params);
}