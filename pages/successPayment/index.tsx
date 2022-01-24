import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { capturePayment, createOrder } from '../../services/order/order';
import styles from '../../styles/SuccessPayment.module.scss';

const Index: FC = () => {
	const [isError, setIsError] = useState<boolean>(false);
	const router = useRouter();
	const capturePaymentEvent = async () => {
		try {
			const paymentId = localStorage.getItem('paymentId');
			const sumPaid = localStorage.getItem('sumPaid');
			if (paymentId && sumPaid) {
				const paymentData = await capturePayment(paymentId, +sumPaid);
				console.log(paymentData);
				if (paymentData.status !== 'succeeded') {
					setIsError(true);
				}
			}
		} catch (e) {
			setIsError(true);
		}
	};

	const createOrderEvent = async () => {
		try {
			const paymentId = localStorage.getItem('paymentId');
			const products = localStorage.getItem('products');
			const clientInfo = localStorage.getItem('clientInfo');
			
			if (paymentId && products && clientInfo) {
				const order = await createOrder({
					products: JSON.parse(products),
					paymentId,
					...JSON.parse(clientInfo),
				});
				console.log(order);
				localStorage.removeItem('products');
				localStorage.removeItem('paymentId');
			}
		} catch (e) {
			setIsError(true);
		}
	};

	useEffect(() => {
		if (!localStorage.getItem('paymentId') || !localStorage.getItem('clientInfo')) {
			router.push('/');
		}
        capturePaymentEvent();
		if (!isError && localStorage.getItem('paymentId') && localStorage.getItem('clientInfo'))  {
			createOrderEvent();
		}
	}, []);
	return (
		<MainLayout>
			<div className={styles.successPayment}>
				<div className={styles.successPayment__body}>
					{!isError ? (
						<>
							
							<h1>Поздравляем!</h1>
							<p>Вы успешно сделали заказ на нашем сайте!</p>
							<p>В скором времени к вам на почту или инстаграм придет сообщение с трек-кодом.</p>
						</>
					) : (
						<h1>Произошла ошибка...</h1>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Index;
