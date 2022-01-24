import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import styles from '../../styles/LoginForm.module.scss';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/state';
import { authLogin } from '../../services/auth/auth';

const Login: FC = () => {
	const [loginValue, setLoginValue] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const { login } = useAuthContext();

	const router = useRouter();

	const loginEvent = async (loginValue: string, password: string) => {
		try {
			const { accessToken } = await authLogin(loginValue, password);
			login(accessToken);

			if (accessToken) {
				router.push('/admin/clothes');
			}
		} catch (e) {
			setError(true);
		}
	};

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await loginEvent(loginValue, password);
	};

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			router.push('/admin/clothes');
		}
	}, []);

	return (
		<Form className={styles.loginForm} onSubmit={submit}>
			<div className={styles.loginForm__body}>
				<FormGroup>
					<Label for='login'>Логин</Label>
					<Input
						id='login'
						name='text'
						placeholder='Логин'
						type='text'
						value={loginValue}
						onChange={(e) => setLoginValue(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Пароль</Label>
					<Input
						id='password'
						name='password'
						placeholder='Пароль'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				{error && (
					<Alert color='danger' >
						Неправильный логин или пароль 
					</Alert>
				)}
				<Button color='primary'>Войти</Button>
			</div>
		</Form>
	);
};

export default Login;
