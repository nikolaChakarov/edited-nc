import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../context/app-state';
import styled from 'styled-components';

import Button from '../button/button';
import Error from '../error/error';
import Input from '../button/input';

import useForm from '../../hooks/useForm';
import { setLocalStorage } from '../../helpers/funcs';

function Login() {
	const { dispatch, lsKey } = useContext(GlobalContext);
	const usernameEl = useRef();

	const init = {
		username: '',
		password: '',
		rememberMe: '',
	};

	const validator = (val) => {
		const errors = {};
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

		if (!val || !emailRegex.test(val.username)) {
			errors.username = 'Plese, enter valid email';
		}

		if (!val || !passwordRegex.test(val.password)) {
			errors.password =
				'Password should be min 6 characters, letter and digit in it';
		}

		return errors;
	};

	const onSubmit = async (val) => {
		setTimeout(() => {
			setSubmitting(false);
		}, 1000);

		const dbRes = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify(val),
		});

		const jsonRes = await dbRes.json();

		if (jsonRes.status === 200) {
			setLocalStorage(lsKey, {
				isLogged: true,
				rememberMe: values.rememberMe,
				username: values.username,
			});

			dispatch({
				type: 'LOGIN',
				payload: { ...values, isLogged: true },
			});
		}
	};

	const {
		values,
		errors,
		submitting,
		setSubmitting,
		handleInputChange,
		handleCheckboxChange,
		handleSubmit,
	} = useForm({
		init,
		validator,
		onSubmit,
	});

	useEffect(() => {
		if (usernameEl.current) {
			usernameEl.current.focus();
		}
	}, []);

	return (
		<LoginStyled className='login'>
			<span className='title'>login</span>
			<h1>SIGN IN TO YOUR ACCOUNT</h1>
			<form className='login-form'>
				<label htmlFor='username'>
					<Input
						ref={usernameEl}
						type='text'
						name='username'
						value={values.username}
						onChange={handleInputChange}
						placeholder='Username'
					/>
					<span className='err-message'>
						{errors.username && <Error message={errors.username} />}
					</span>
				</label>
				<label htmlFor='password'>
					<Input
						type='text'
						name='password'
						value={values.password}
						onChange={handleInputChange}
						placeholder='Password'
					/>
					<span className='err-message'>
						{errors.password && <Error message={errors.password} />}
					</span>
				</label>
				<label htmlFor='rememberMe' className='remember-me container'>
					<Input
						type='checkbox'
						name='rememberMe'
						value={values.rememberMe}
						onChange={handleCheckboxChange}
					/>
					<span>Remember me</span>
				</label>

				<div className='btn-wrapper'>
					<Button onClickHandler={handleSubmit} disabled={submitting}>
						Login Now
					</Button>
				</div>
			</form>
		</LoginStyled>
	);
}

const LoginStyled = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 7.8rem 4.5rem 6.7rem;
	border-radius: 2.4rem;
	position: relative;

	.title {
		position: absolute;
		top: -1.6rem;
		left: 0;
		font-size: 1.2rem;
		color: #fff;
		opacity: 0.4;
	}

	h1 {
		font-weight: 900;
		font-size: 3rem;
		line-height: 4.5rem;
		color: #333;
		margin-bottom: 6.9rem;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.8rem;

		label {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 0 2.3rem;

			input[type='text'] {
				flex: 1;
			}
		}

		label.remember-me {
			display: flex;
			flex-direction: initial;
			align-items: center;
			gap: 0.6rem;

			span {
				font-weight: 400;
				line-height: 2.8rem;
				color: #333;
				font-size: 1.4rem;
			}
		}

		.btn-wrapper {
			display: flex;
			justify-content: center;
			margin-top: 4rem;
		}

		input[type='checkbox'] {
			appearance: none;
			background-color: #fff;
			margin: 0;
			font: inherit;
			color: currentColor;
			width: 2rem;
			height: 2rem;
			border: 1px solid var(--light);
			border-radius: 0.15em;
			transform: translateY(-0.2em);
			display: grid;
			place-content: center;
			padding: 0;
			align-self: flex-end;
		}

		input[type='checkbox']::before {
			content: '';
			width: 0.65em;
			height: 0.65em;
			transform: scale(0);
			transition: 120ms transform ease-in-out;
			box-shadow: inset 1em 1em var(--form-control-color);
			background-color: var(--light);
		}

		input[type='checkbox']:checked::before {
			transform: scale(1);
		}

		.err-message {
			font-size: 1.2rem;
			color: #777;
		}
	}
`;

export default Login;
