import { combineReducers, createStore, applyMiddleware } from 'redux';


const reducers = combineReducers (
{
	global:     require ('~/App/reducer.js'),
	toolbar:    require ('~/Toolbar/reducer.js'),
	popup:      require ('~/Popup/reducer.js'),
	mainCanvas: require ('~/MainCanvas/reducer.js'),
	tempCanvas: require ('~/TempCanvas/reducer.js'),
});

const middleware =
[
	require ('~/Popup/middleware.js'),
	require ('~/MainCanvas/middleware.js'),
	require ('~/TempCanvas/middleware.js'),
];

/*const createStoreWithMiddleware = applyMiddleware (...middleware) (createStore);

const devTools = process.env.NODE_ENV === 'production' ? null : window.__REDUX_DEVTOOLS_EXTENSION__;
const store    = createStoreWithMiddleware (reducers, devTools  &&  devTools ());*/

const store = createStore (reducers, undefined, applyMiddleware (...middleware));

store.subscribe (() =>
{
	console.log ('State changed:', store.getState ());
});


export default store;
