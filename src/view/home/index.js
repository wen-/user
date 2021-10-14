import { useSelector, useDispatch } from 'react-redux';
import {
    add,
    reduce,
    fetchTestList,
} from '../../model/test';

import {
    selectTestValue,
} from '../../model/test/select';

const Home = () => {
    const v = useSelector(selectTestValue);
    const dispatch = useDispatch();
    console.log(add('aaa'));
    return (
        <div>
            <h1>home</h1>
            <p>{v.toString()}</p>
            <button onClick={()=>dispatch(add())}>add</button>
            <button onClick={()=>dispatch(reduce())}>reduce</button>
            <button onClick={()=>{
                dispatch(fetchTestList())
            }}>getData</button>
        </div>
        
    )
}
  
export default Home;