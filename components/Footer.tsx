import React, { FC } from 'react';
import styles from '../styles/Footer.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__row}>
				<div>Contact us:</div>
				<div>bellitrix@gmail.com</div>
				<div>По любым вопросам писать нам на почту или в Instagram.</div>
				<a href='https://www.instagram.com/bellitrix_wear/' target='_blank'><img src='/insta.png' alt='' /></a>
			</div>
		</footer>
	);
};

export default Footer;
