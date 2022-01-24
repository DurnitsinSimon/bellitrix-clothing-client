import React, { FC, useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from '../styles/Basket.module.scss';
import { Clothe } from '../types/clothe';
import BasketModal from './Basket/BasketModal';

const Basket: FC = () => {
	const [number, setNumber] = useState<number>(0);
	const [sum, setSum] = useState<number>(0);
	// const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
	const [isShown, setIsShown] = useState<boolean>(false);
	useEffect(() => {
		const products = localStorage.getItem('products');
		if (products) {
			const parsedProducts = JSON.parse(products);
			setNumber(parsedProducts.length);
			parsedProducts.forEach((product: { clothe: Clothe; currentSize: string }) =>
				setSum((prev) => prev + product.clothe.price)
			);
		}
	}, []);

	return (
		<div
			className={styles.basket}
			// onMouseOver={() => setIsMouseOver(true)}
			// onMouseLeave={() => setIsMouseOver(false)}
			onClick={() => {
				setIsShown(true);
			}}
		>
			{/* {isMouseOver && sum !== 0 && !isShown && <h2 className={styles.basket__sum}>{sum} р. =</h2>} */}

			<div className={styles.basket__body}>
				<img src='/basket.png' alt='' width={50} className={styles.basket__img} />
				<h1 className={styles.basket__number}>{number}</h1>
			</div>
			<Modal toggle={() => setIsShown(!isShown)} isOpen={isShown}>
				<ModalBody>
					<BasketModal setNumber={setNumber} setSum={setSum} sum={sum}/>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default Basket;
