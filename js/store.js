import { combineReducers, createStore, applyMiddleware } from 'redux';


const reducers = combineReducers (
{
	global:     require ('~/App/reducer.js'),
	mainCanvas: require ('~/MainCanvas/reducer.js'),
	tempCanvas: require ('~/TempCanvas/reducer.js'),
	toolbar:    require ('~/Toolbar/reducer.js'),
});

const middleware =
[
	require ('~/MainCanvas/middleware.js'),
	require ('~/TempCanvas/middleware.js'),
];

const createStoreWithMiddleware = applyMiddleware (...middleware) (createStore);

const devTools = process.env.NODE_ENV === 'production' ? null : window.devToolsExtension;
const store    = createStoreWithMiddleware (reducers, devTools  &&  devTools ());

store.subscribe (() =>
{
	console.log ('State changed:', store.getState ());
});


export default store;
