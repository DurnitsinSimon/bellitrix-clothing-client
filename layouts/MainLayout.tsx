import Head from 'next/head';
import React, { FC } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/MainLayout.module.scss';

interface IProps {
	title?: string;
	description?: string;
}

const MainLayout: FC<IProps> = ({ children, title, description }) => {
	
	return (
		<div className={styles.wrapper}>
			<Head>
				<title>{title || 'BELLITRIX'}</title>
				<meta name={'description'} content={'bellitrix' + description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
