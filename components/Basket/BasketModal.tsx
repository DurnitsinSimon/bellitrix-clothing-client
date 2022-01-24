import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/BasketModal.module.scss';
import { Clothe } from '../../types/clothe';
import BasketModalItem from './BasketModalItem';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createPayment } from '../../services/order/order';
import { Alert } from 'reactstrap';

interface Props {
	setNumber: Dispatch<SetStateAction<number>>;
	setSum: Dispatch<SetStateAction<number>>;
	sum: number;
}

type Inputs = {
	fullName: string;
	email: string;
	phone: string;
	address: string;
};

const BasketModal: FC<Props> = ({ setNumber, setSum, sum }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [products, setProducts] = useState<{ clothe: Clothe; currentSize: string }[]>([]);
	const [shipping, setShipping] = useState<number>(350);
	const [error, setError] = useState<boolean>(false);
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const createBasketOrder = async (sumPaid: number) => {
		try {
			const paymentData = await createPayment(sumPaid);
			if (paymentData) {
				setIsFetched(true);
				localStorage.setItem('paymentId', paymentData.id);
				localStorage.setItem('sumPaid', (sum + shipping).toString());
			}
			console.log(paymentData);

			setTimeout(() => {
				if (paymentData.confirmation.confirmation_url) {
					window.location.href = paymentData.confirmation.confirmation_url;
				}
			}, 3000);
		} catch (e) {
			setError(true);
		}
	};

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await createBasketOrder(sum + shipping);
		console.log(data);

		const clientInfo = {
			...data,
			worldWideShipping: shipping === 550,
			sumPaid: sum + shipping,
		};
		localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
	};

	useEffect(() => {
		const localProducts = localStorage.getItem('products');
		if (localProducts) {
			setProducts(JSON.parse(localProducts));
		}
	}, []);

	if (products.length === 0) {
		return <h2>Нет добавленных вещей</h2>;
	}

	return (
		<div className={styles.basketModal}>
			<div className={styles.basketModal__body}>
				<h2 className={styles.basketModal__title}>Ваш заказ:</h2>
				<div className={styles.basketModal__clothes}>
					{products.length === 0 && <h4>Нет добавленных вещей</h4>}
					{products.map((product, i) => (
						<BasketModalItem
							currentSize={product.currentSize}
							name={product.clothe.name}
							src={product.clothe.src}
							price={product.clothe.price}
							key={i}
							i={i}
							setProducts={setProducts}
							setNumber={setNumber}
							setSum={setSum}
						/>
					))}
					<p className={styles.basketModal__clothesSum}>Сумма: {sum + shipping} р.</p>
					<p className={styles.basketModal__clothesShipping}>Доставка: {shipping} р.</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.basketModal__formItem}>
						<label htmlFor='fullName'>Ваше ФИО</label>
						<input type='text' placeholder='Иван Иванов' {...register('fullName')} />
					</div>
					<div className={styles.basketModal__formItem}>
						<label htmlFor='email'>Ваш Email или Instagram</label>
						<input
							type='email'
							placeholder='qwerty@gmail.com'
							{...register('email', { required: true })}
							className={errors.email && styles.basketModal__formRequired}
						/>
						{errors.email && <span>Пожалуйста, заполните все обязательные поля</span>}
					</div>
					<div className={styles.basketModal__formItem}>
						<label htmlFor='phone'>Ваш телефон</label>
						<input
							type='text'
							placeholder='+79510000000'
							{...register('phone', { required: true })}
							className={errors.phone && styles.basketModal__formRequired}
						/>
						{errors.phone && <span>Пожалуйста, заполните все обязательные поля</span>}
					</div>
					<div className={styles.basketModal__formItem}>
						<label htmlFor='worldShipping'>Доставка зарубеж</label>
						<select
							name='worldShipping'
							id=''
							onChange={(e) => setShipping(e.target.value === 'true' ? 550 : 350)}
						>
							<option value='false'>Не требуется</option>
							<option value='true'>Требуется(550р)</option>
						</select>
					</div>
					<div className={styles.basketModal__formItem}>
						<label htmlFor='address'>Ваш адрес</label>
						<input
							type='text'
							placeholder='Россия, Москва, улица Пушкина, дом 1, квартира 10'
							{...register('address', { required: true })}
							className={errors.address && styles.basketModal__formRequired}
						/>
						{errors.address && <span>Пожалуйста, заполните все обязательные поля</span>}
					</div>
					<button>Оформить заказ</button>
					{isFetched && (
						<Alert color='success' style={{ margin: '20px 0 0 0' }}>
							Спасибо! Заказ оформлен. Пожалуйста, подождите. Идет переход к оплате....
						</Alert>
					)}
					{error && (
						<Alert color='danger' style={{ margin: '20px 0 0 0' }}>
							Произошла ошибка при создании заказа...
						</Alert>
					)}
				</form>
			</div>
		</div>
	);
};

export default BasketModal;
