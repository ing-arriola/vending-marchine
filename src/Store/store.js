import {createStoreon} from 'storeon'
import processing from './processing'
import products from './products'
//import { persistState } from '@storeon/localstorage'
const store = createStoreon([
    processing,
    products
])

export default store;
