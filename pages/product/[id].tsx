import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import SizeInput from '../../components/SizeInput';
import { URL } from '../../services';
import { findClotheById } from '../../services/clothes/clothes';
import styles from '../../styles/Product.module.scss';
import loadingStyles from '../../styles/ListItem.module.scss';
import { Clothe } from '../../types/clothe';
import Head from 'next/head';

const Product: FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const [clothe, setClothe] = useState<Clothe | null>(null);
	const [error, setError] = useState(false);
	const [size, setSize] = useState<string>('S');

	const fetchClothe = async (id: string | string[]) => {
		if (id) {
			try {
				const clothe = await findClotheById(id);
				console.log(clothe);
				setClothe(clothe);
			} catch (e) {
				setError(true);
			}
		}
	};

	const saveClotheInLocalStorage = (clothe: Clothe, size: string) => {
		const oldProducts = localStorage.getItem('products');
		let products: { clothe: Clothe; currentSize: string }[] = [];
		if (oldProducts) {
			products = [...JSON.parse(oldProducts)];
		}
		products.push({ clothe, currentSize: clothe.oneSize ? 'oneSize' : size });
		const localProducts = JSON.stringify(products);
		localStorage.setItem('products', localProducts);
		router.push('/');
	};

	useEffect(() => {
		if (id) {
			fetchClothe(id);
		}
	}, [id]);

	if (error) {
		return <h1>Error</h1>;
	}

	if (!clothe) {
		return <div className={loadingStyles.loading}>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>{'BELLITRIX'}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.product}>
				<div className={`${styles.product__body} ${clothe ? loadingStyles.slideTop : ''}`}>
					<h1 className={styles.product__cross} onClick={() => router.push('/')}>
						╳
					</h1>
					<img src={`${URL}${clothe?.src}`} alt='' />
					<div className={styles.product__info}>
						<h1>{clothe?.name}</h1>
						<p>{`${Math.floor(clothe.price / 1000)} ${clothe.price % 1000}`} р.</p>
						{clothe.soldOut ? <p className={styles.soldOut}>Нет в наличии</p> : <p>В наличии</p>}
						<SizeInput
							value={size}
							onChange={(e) => setSize(e.target.value)}
							oneSize={clothe.oneSize}
							sizes={clothe.sizes}
						/>
						<button
							className={clothe.soldOut ? styles.soldOut__btn : undefined}
							onClick={() => (clothe.soldOut ? null : saveClotheInLocalStorage(clothe, size))}
						>
							{clothe.soldOut ? 'Нет в наличии' : 'Заказать'}
						</button>
						<ul>
							{clothe.description.split(',').map((item, i) => (
								<li key={i}>- {item}</li>
							))}
						</ul>
						<p>*Доставка в течении 4-7 дней</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
