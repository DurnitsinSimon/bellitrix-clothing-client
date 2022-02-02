import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import MainLayout from '../layouts/MainLayout';
import { getAll } from '../services/clothes/clothes';
import styles from '../styles/ListItem.module.scss';
import { Clothe } from '../types/clothe';



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
