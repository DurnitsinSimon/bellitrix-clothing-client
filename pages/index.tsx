import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import MainLayout from '../layouts/MainLayout';
import { getAll } from '../services/clothes/clothes';
import styles from '../styles/ListItem.module.scss';
import { Clothe } from '../types/clothe';

export const items = [
	{
		src: '/sharf.jpg',
		secondSrc: '/sharf.jpg',
		name: '«PAINFUL LOVE» SCARF',
		price: 1490,
		description: `Премиальный Акрил 100%
	,Размер 180х25 (Длина х Ширина)
	,Лимитированный тираж 70 шт`,
		oneSize: true,
	},
	{
		src: '/zip-hoodie.jpg',
		secondSrc: '/zip-hoodie.jpg',
		name: '"BELLITRIX" ZIP-HOODIE',
		price: 3890,
		soldOut: true,
		description: ` Оверсайз крой (большемерят)
		,Плотность: 420 г/м (100% хлопок)
		,Ткань: футер 3-х нитка с начёсом (идеально тёплая на холода)
		,Принт: шелкография
		,Размеры: S / M / L / XL
		,Лимитированный тираж: 25`,
	},
	{
		src: '/hoodie.jpg',
		secondSrc: '/hoodie.jpg',
		name: '"Bellitrix Logo" Black Hoodie',
		price: 2990,
		description: `Лекала Palm Angels,идеальный Оверсайз
	,Кулирная гладь 380 г/м (100% хлопок)
	,Принт: шелкография
	,Размеры: S / M / L / XL
	,Лимитированный тираж: 50`,
	},
	{
		src: '/same-shit.jpg',
		secondSrc: '/same-shit.jpg',
		name: '«SАME SHIT» SCARF -BLACK',
		price: 1490,
		description: `Премиальный Акрил 100%
	,Размер 170х25 (Длина х Ширина)
	,Лимитированный тираж 50 шт`,
		oneSize: true,
	},
	{
		src: '/vamp-sweater.jpg',
		secondSrc: '/vamp-sweater.jpg',
		name: '«VAMP | CRYSTAL SWEATER»',
		price: 4990,
		description: `50% полушерсть / 50% акрил
		,Оверсайз крой
		,Размеры: S / M / L / XL
		,Мультисезон`,
	},
];

const Home: NextPage = () => {
	const [clothes, setClothes] = useState<Clothe[]>();
	const [error, setError] = useState<boolean>(false);

	const fetchClothes = async () => {
		try {
			const clothes = await getAll();
			setClothes(clothes);
		} catch (e) {
			setError(true);
		}
	};

	useEffect(() => {
		fetchClothes();
	}, []);

	if (error) {
		return (
			<div className='container'>
				<div className={styles.list}>
					<h1>Error</h1>
				</div>
			</div>
		);
	}

	if (!clothes) {
		return (
			<div className={styles.loading}>
				Loading...
			</div>
		);
	}

	return (
		<MainLayout>
			<div className='container'>
				<div className={`${styles.list} ${clothes ? styles.slideTop : ''}`}>
					{clothes.map((item, index) => (
						<ListItem
							_id={item._id}
							key={index}
							src={item.src}
							name={item.name}
							price={item.price}
							soldOut={item.soldOut}
							index={index}
						/>
					))}
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
