import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from '../styles/Header.module.scss';
import Basket from './Basket';

const Header: FC = () => {
	const router = useRouter();
	return (
		<header className={styles.header}>
			<div className={styles.header__row}>
				<img
					src='/bellitrix.jpg'
					alt='bellitrix'
					className={styles.header__logo}
					onClick={() => router.push('/')}
				/>
				<Basket />
			</div>
		</header>
	);
};

export default Header;
