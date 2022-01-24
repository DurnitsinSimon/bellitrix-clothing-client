import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { createClothe } from '../../services/clothes/clothes';
import { Clothe, CreateClothe } from '../../types/clothe';

interface Props {
	setIsShown: Dispatch<SetStateAction<boolean>>;
	fetchClothes: () => void;
}

const ModalClothes: FC<Props> = ({ setIsShown, fetchClothes }) => {
	const [clothe, setClothe] = useState<CreateClothe>({
		name: '',
		description: '',
		price: 0,
		oneSize: false,
		sizes: '',
	});
	const [photo, setPhoto] = useState<File | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [newClothe, setNewClothe] = useState<Clothe | null>(null);
	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const clotheData = new FormData();
		clotheData.append('name', clothe.name);
		clotheData.append('description', clothe.description);
		clotheData.append('price', clothe.price.toString());
		clotheData.append('oneSize', String(clothe.oneSize));
		if (!clothe.oneSize && clothe.sizes) {
			clotheData.append('sizes', clothe.sizes);
		}
		if(photo) {
			clotheData.append('photo', photo);
		}
		try {
			const clothe = await createClothe(clotheData);
			setNewClothe(clothe);
			fetchClothes();
			setTimeout(() => {
				setIsShown(false);
			}, 4000);
		} catch (e) {
			setError(true);
			console.log(e);
		}
	};

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
			<FormGroup>
				<Label for='photo'>Фотография</Label>
				<Input
					id='photo'
					name='photo'
					placeholder='Фотография'
					type='file'
					onChange={(e) => {
						if (e.target.files) {
							setPhoto(e.target.files[0]);
						}
					}}
				/>
			</FormGroup>
			<Button color='primary'>Добавить</Button>
			{error && (
				<Alert color='danger' style={{ margin: '20px 0 0 0' }}>
					Произошла ошибка
				</Alert>
			)}
			{newClothe && (
				<Alert color='success' style={{ margin: '20px 0 0 0' }}>
					Вещь успешно создана!
				</Alert>
			)}
		</Form>
	);
};

export default ModalClothes;
