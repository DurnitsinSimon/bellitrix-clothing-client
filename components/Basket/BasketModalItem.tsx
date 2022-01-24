import React, { Dispatch, FC, SetStateAction } from 'react';
import { URL } from '../../services';
import styles from '../../styles/BasketModal.module.scss';
import { Clothe } from '../../types/clothe';

interface Props {
	src?: string;
	price: number;
	name: string;
	currentSize: string;
	i?: number;
	setProducts?: Dispatch<SetStateAction<{ clothe: Clothe; currentSize: string }[]>>;
	setNumber?: Dispatch<SetStateAction<number>>;
	setSum?: Dispatch<SetStateAction<number>>;
}

const BasketModalItem: FC<Props> = ({ currentSize, name, price, src, i, setProducts, setNumber, setSum }) => {
	const deleteProductFromLocalStorage = (index: number) => {
		const products = localStorage.getItem('products');
		if (products) {
			const newProducts: { clothe: Clothe; currentSize: string }[] = JSON.parse(products).filter(
				(_: { clothe: Clothe; currentSize: string }, i: number) => index !== i
			);
			if (setProducts && setNumber && setSum) {
				setProducts(newProducts);
				setNumber(newProducts.length);
				const sum: number = newProducts.reduce((acc, i) => {
					acc += i.clothe.price;
					return acc;
				}, 0);
				setSum(sum);
			}

			localStorage.setItem('products', JSON.stringify(newProducts));
		}
	};
	return (
		<div className={styles.basketModal__clothesItem}>
			<img src={`${URL}${src}`} alt='' width={70} height={70} />
			<div className={styles.basketModal__clothesSize}>
				<h6>{name}</h6>
				<p>размер: {currentSize}</p>
			</div>
			<p className={styles.basketModal__clothesPrice}>{price} р.</p>
			{i ? (
				<p className={styles.basketModal__clothesClose} onClick={() => deleteProductFromLocalStorage(i)}>
					╳
				</p>
			) : null}
		</div>
	);
};

export default BasketModalItem;
