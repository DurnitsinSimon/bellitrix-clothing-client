import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { URL } from '../services';
import styles from '../styles/ListItem.module.scss';

interface IProps {
	_id: string;
	src?: string;
	name: string;
	price: number;
	soldOut?: boolean;
	index: number;
}

const ListItem: FC<IProps> = ({ src, name, price, soldOut = false, _id }) => {
	const router = useRouter();
	return (
		<div className={styles.listItem} onClick={() => router.push(`/product/${_id}`)}>
			<img src={`${URL}${src}`} alt='' width={360} height={400} />

			<h1>{name}</h1>
			<p>{`${Math.floor(price / 1000)} ${price - Math.floor(price / 1000) * 1000 < 100 ? 0 : ''}${price - Math.floor(price / 1000) * 1000 < 100 ? 0 : ''}${price - Math.floor(price / 1000) * 1000}`} р.</p>
			{soldOut ? <p className={styles.soldOut}>Нет в наличии</p> : <p>В наличии</p>}
		</div>
	);
};

export default ListItem;
