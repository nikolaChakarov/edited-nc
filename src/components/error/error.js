import styled from 'styled-components';

function Error({ message }) {
	return (
		<ErrorStyled className='error-el'>
			<span>{message}</span>
		</ErrorStyled>
	);
}

const ErrorStyled = styled.div``;

export default Error;
