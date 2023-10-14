import { createContext, useReducer } from 'react';
import appReducer from './ap-reducer';
import { getLocalStorage } from '../helpers/funcs';

const lsKey = 'edited-login';

const initState = {
	error: null,
	loading: false,
	user: getLocalStorage(lsKey),
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initState);

	return (
		<GlobalContext.Provider
			value={{
				lsKey: 'edited-login',
				dispatch,
				state,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
