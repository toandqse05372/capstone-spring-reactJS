import { combineReducers } from 'redux';
import User from './User';
import Ticket from './Ticket';
import Loader from './Loader';
import LoaderPart from './LoaderPart';
import Categories from './Categories';
import City from './City';

const myReducers = combineReducers({
    User,
    Ticket,
    Loader,
    LoaderPart,
    Categories,
    City
});
export default myReducers;