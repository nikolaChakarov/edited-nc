import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/app-state';
import { getLocalStorage } from '../helpers/funcs';

function useForm({ init, onSubmit, validator }) {
	const { lsKey } = useContext(GlobalContext);

	const [values, setValues] = useState(init);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const handleInputChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

		if (errors[e.target.name]) {
			setErrors((prev) => ({
				...prev,
				[e.target.name]: '',
			}));
		}
	};

	const handleCheckboxChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: !prev[e.target.name],
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errs = validator(values);
		const errsKeys = Object.keys(errs);

		if (errsKeys.length) {
			setErrors((prev) => ({
				...prev,
				...errs,
			}));
			return;
		}
		setSubmitting(true);
		onSubmit(values);
	};

	useEffect(() => {
		let ls = getLocalStorage(lsKey);

		if (ls?.rememberMe) {
			setValues((prev) => ({
				...prev,
				username: ls?.username ? ls.username : '',
			}));
		}
	}, []);

	return {
		values,
		errors,
		submitting,
		setSubmitting,
		handleInputChange,
		handleCheckboxChange,
		handleSubmit,
	};
}

export default useForm;
