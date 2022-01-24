
import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getAll } from '../../services/clothes/clothes';
import mainStyles from '../../styles/AdminLayout.module.scss';
import panelStyles from '../../styles/AdminPanel.module.scss';
import { Clothe } from '../../types/clothe';
import AdminClothesPanelItem from './AdminClothesPanelItem';
import ModalClothes from './ModalClothes';

const AdminClothesPanel: FC = () => {
	const [params] = useState<string[]>(['Название', 'Цена', 'Описание', 'Размеры', 'soldOut']);
	const [isShown, setIsShown] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [clothes, setClothes] = useState<Clothe[]>([]);

	const fetchClothes = async () => {
		try {
			const clothes = await getAll();
			setClothes(clothes);
		} catch (e) {
			setError(true);
			console.log(e);
		}
	};

	useEffect(() => {
		fetchClothes();
	}, []);

	if (error) {
		return (
			<div className={`${mainStyles.adminLayout__mainContent}`}>
				<h1>Ошибка</h1>
			</div>
		);
	}

	return (
		<div className={`${mainStyles.adminLayout__mainContent}`}>
			<div className={panelStyles.panel__header}>
				<ul>
					{params.map((param, i) => (
						<li key={i}>{param}</li>
					))}
				</ul>
				<Button color='primary' onClick={() => setIsShown(true)}>
					Добавить вещь
				</Button>
			</div>
			<div className={panelStyles.panel__content}>
				{clothes.map((clothe) => (
					<AdminClothesPanelItem key={clothe._id} {...clothe} fetchClothes={fetchClothes}/>
				))}
			</div>
			<Modal toggle={() => setIsShown(!isShown)} isOpen={isShown}>
				<ModalHeader toggle={() => setIsShown(!isShown)}>Добавить вещь</ModalHeader>
				<ModalBody>
					<ModalClothes setIsShown={setIsShown} fetchClothes={fetchClothes}/>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default AdminClothesPanel;
