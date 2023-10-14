import { useContext, useCallback } from 'react';
import { GlobalContext } from '../../context/app-state';
import Button from '../../components/button/button';
import { setLocalStorage } from '../../helpers/funcs';
import styled from 'styled-components';

const HelloPage = () => {
	const { dispatch, lsKey, state } = useContext(GlobalContext);

	const handleLogout = useCallback(() => {
		const ls = state.user.rememberMe
			? {
					isLogged: false,
					rememberMe: true,
					username: state.user.username,
			  }
			: { isLogged: false };

		setLocalStorage(lsKey, ls);

		dispatch({
			type: 'LOGOUT',
		});
	}, []);

	return (
		<HelloPageStyled className='hello-page'>
			<div className='inner'>
				<h1>Hi, {state.user.username}</h1>
				<div className='btn-wrapper'>
					<Button onClickHandler={handleLogout}>
						<span>... and By!</span>
					</Button>
				</div>
			</div>
		</HelloPageStyled>
	);
};

const HelloPageStyled = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #dedede;
	align-items: center;
	justify-content: center;

	.inner {
		border: 2px groove #fff;
		padding: 3rem;
	}

	.btn-wrapper {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
`;

export default HelloPage;
