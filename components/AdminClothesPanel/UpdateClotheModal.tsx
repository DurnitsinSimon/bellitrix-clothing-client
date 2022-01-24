import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { findClotheById, updateClothe } from '../../services/clothes/clothes';
import { Clothe} from '../../types/clothe';

interface Props {
	setIsShown: Dispatch<SetStateAction<boolean>>;
	fetchClothes: () => void;
    id: string;
}

const UpdateClothesModal: FC<Props> = ({ setIsShown, fetchClothes, id }) => {
	const [clothe, setClothe] = useState<Clothe>({
        _id: id,
		name: '',
		description: '',
		price: 0,
		oneSize: false,
		sizes: '',
        soldOut: false
	});
	const [error, setError] = useState<boolean>(false);
	const [updatedClothe, setUpdatedClothe] = useState<Clothe | null>(null);
	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		try {
			const updatedClothe = await updateClothe(clothe);
			setUpdatedClothe(updatedClothe);
			fetchClothes();
			setTimeout(() => {
				setIsShown(false);
			}, 4000);
		} catch (e) {
			setError(true);
			console.log(e);
		}
	};

    const fetchClothe = async (id: string) => {
		if (id) {
			try {
				const clothe = await findClotheById(id);
				setClothe(clothe);
			} catch (e) {
				setError(true);
			}
		}
	};

    useEffect(() => {
        fetchClothe(id);
    }, [id]);

	return (
		<Form onSubmit={submit}>
			<FormGroup>
				<Label for='name'>Название</Label>
				<Input
					id='name'
					name='text'
					placeholder='Название вещи'
					type='text'
					value={clothe.name}
					onChange={(e) => setClothe({ ...clothe, name: e.target.value })}
				/>
			</FormGroup>
			<FormGroup>
				<Label for='description'>
					Описание <br />
					(каждое отдельное свойство в строку через запятую, без пробелов)
				</Label>
				<Input
					id='description'
					name='description'
					placeholder='Описание'
					type='textarea'
					value={clothe.description}
					onChange={(e) => setClothe({ ...clothe, description: e.target.value })}
				/>
			</FormGroup>
			<FormGroup>
				<Label for='oneSize'>Один размер</Label>
				<Input
					id='oneSize'
					name='oneSize'
					placeholder='Один размер'
					type='select'
					value={String(clothe.oneSize)}
					onChange={(e) => {
						setClothe({ ...clothe, oneSize: e.target.value === 'true' ? true : false });
					}}
				>
					<option value={'true'}>Да</option>
					<option value={'false'}>Нет</option>
				</Input>
			</FormGroup>
            <FormGroup>
				<Label for='soldOut'>Sold out</Label>
				<Input
					id='soldOut'
					name='soldOut'
					placeholder='Sold out'
					type='select'
					value={String(clothe.soldOut)}
					onChange={(e) => {
						setClothe({ ...clothe, soldOut: e.target.value === 'true' ? true : false });
					}}
				>
					<option value={'true'}>Да</option>
					<option value={'false'}>Нет</option>
				</Input>
			</FormGroup>
			{!clothe.oneSize && (
				<FormGroup>
					<Label for='sizes'>
						Размеры <br />
						(каждый отдельный размер в строку через запятую без пробелов)
					</Label>
					<Input
						id='sizes'
						name='sizes'
						placeholder='Размеры пример: (M,L,XL)'
						type='text'
						value={clothe.sizes}
						onChange={(e) => setClothe({ ...clothe, sizes: e.target.value })}
					/>
				</FormGroup>
			)}
			<FormGroup>
				<Label for='price'>Стоимость</Label>
				<Input
					id='price'
					name='price'
					placeholder='Стоимость вещи'
					type='number'
					value={clothe.price}
					onChange={(e) => setClothe({ ...clothe, price: +e.target.value })}
				/>
			</FormGroup>
			<Button color='primary'>Изменить</Button>
			{error && (
				<Alert color='danger' style={{ margin: '20px 0 0 0' }}>
					Произошла ошибка
				</Alert>
			)}
			{updatedClothe && (
				<Alert color='success' style={{ margin: '20px 0 0 0' }}>
					Вещь успешно изменена!
				</Alert>
			)}
		</Form>
	);
};

export default UpdateClothesModal;
