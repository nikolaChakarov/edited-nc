import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/app-state';

import LoginPage from './pages/login/login-page';
import HelloPage from './pages/hello/hello-page';

function App() {
	const { state } = useContext(GlobalContext);

	useEffect(() => {}, [state?.user?.isLogged]);

	return <>{state?.user?.isLogged ? <HelloPage /> : <LoginPage />}</>;
}

export default App;
