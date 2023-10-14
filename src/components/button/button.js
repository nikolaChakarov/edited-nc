import { styled } from 'styled-components';

function Button({ disabled, onClickHandler, children }) {
	return (
		<ButtonStyled
			className='bttn'
			onClick={onClickHandler}
			disabled={disabled}
		>
			{children}
		</ButtonStyled>
	);
}

const ButtonStyled = styled.button`
	padding: 1.7rem 3rem;
	background: linear-gradient(99.78deg, #9181f4 -5.85%, #5038ed 109.55%);
	color: #fff;
	border-radius: 1.6rem;
	font-size: 1.2rem;
	font-weight: 700;
	line-height: 1.8rem;
	box-shadow: var(--shadow);

	&:disabled {
		background: #dedede;
	}
`;

export default Button;
