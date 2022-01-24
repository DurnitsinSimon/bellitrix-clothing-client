import React, { FC, useEffect, useState } from 'react';
import styles from '../styles/AdminLayout.module.scss';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/state';
import Head from 'next/head';
import { getProfile } from '../services/auth/auth';

const AdminLayout: FC = ({ children }) => {
	const [links] = useState<{ href: string; name: string }[]>([
		{ href: '/admin/clothes', name: 'Одежда' },
		{ href: '/admin/orders', name: 'Заказы' },
	]);
	const router = useRouter();
	const path = router.pathname.split('/')[2];
	const { logout, login } = useAuthContext();
	const checkAuth = async () => {
		try {
			const {accessToken} = await getProfile();
			login(accessToken);
		} catch (e) {
			logout();
		}
	};

	useEffect(() => {
		if(!localStorage.getItem('accessToken')) {
			router.push('/admin/login');
		}
		checkAuth();
	}, []);
	return (
		<>
			<Head>
				<title>{'BELLITRIX ADMIN PANEL'}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.adminLayout}>
				<div className={styles.adminLayout__cancel}>
					<Button
						color='danger'
						onClick={() => {
							logout();
							router.push('/');
						}}
					>
						Прекратить редактирование
					</Button>
				</div>
				<div className={styles.adminLayout__sidebar}>
					<ul>
						{links.map((link, i) => (
							<li key={i}>
								<Button
									color='primary'
									outline={!(path === link.href.split('/')[2])}
									onClick={() => {
										router.push(link.href);
									}}
								>
									{link.name}
								</Button>
							</li>
						))}
					</ul>
				</div>
				<>{children}</>
			</div>
		</>
	);
};

export default AdminLayout;
