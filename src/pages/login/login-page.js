import styled from 'styled-components';
import Login from '../../components/login/login';

const LoginPage = () => {
	return (
		<LoginPageStyled>
			<Login />
		</LoginPageStyled>
	);
};

const LoginPageStyled = styled.div`
	background: linear-gradient(217.64deg, #9181f4 -5.84%, #5038ed 106.73%);
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default LoginPage;
