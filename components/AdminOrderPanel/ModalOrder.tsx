import React, { FC, useEffect, useState } from 'react';
import { findOrderById } from '../../services/order/order';
import { Order } from '../../types/order';
import BasketModalItem from '../Basket/BasketModalItem';
import styles from '../../styles/AdminModalOrder.module.scss';

const ModalOrder: FC<{ id: string }> = ({ id }) => {
	const [order, setOrder] = useState<Order>();

	const fetchOrder = async () => {
		try {
			const order = await findOrderById(id);
			setOrder(order);
		} catch (e) {
			console.log(e);
		}
	};
	console.log(order);

	useEffect(() => {
		fetchOrder();
	}, []);
	return (
		<div className={styles.modalOrder}>
			{order?.products.map((product, i) => (
				<BasketModalItem currentSize={product.currentSize} {...product.clothe} key={i} />
			))}
            <ul>
                <li>Адрес: <span>{order?.address}</span></li>
                <li>Почта или инстаграм: <span>{order?.email}</span></li>
                <li>ФИО: <span>{order?.fullName === '' ? 'Не указано': order?.fullName}</span></li>
                <li>Телефон: <span>{order?.phone}</span></li>
                <li>Доставка зарубеж: <span>{order?.worldWideShipping ? 'Требуется' : 'Не требуется'}</span></li>
                <li>Общая сумма: <span>{order?.sumPaid}</span></li>

            </ul>
		</div>
	);
};

export default ModalOrder;
