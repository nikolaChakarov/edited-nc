import { forwardRef } from 'react';
import { styled } from 'styled-components';

const Input = forwardRef(
	({ type, name, value, onChange, placeholder }, ref) => {
		return (
			<InputStyled
				ref={ref}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		);
	}
);

const InputStyled = styled.input`
	border: none;
	background: #f0edffcc;
	border-radius: 1.6rem;
	font-weight: 400;
	font-size: 1.2rem;
	line-height: 1.8rem;
	color: #787878;
	outline: none;
	padding: 1.7rem 1.8rem;
`;

export default Input;
