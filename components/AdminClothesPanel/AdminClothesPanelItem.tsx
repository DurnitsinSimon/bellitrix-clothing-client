import React, { FC, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { deleteClothe } from '../../services/clothes/clothes';
import styles from '../../styles/AdminPanel.module.scss';
import UpdateClothesModal from './UpdateClotheModal';

interface Props {
	_id: string;

	name: string;

	price: number;

	description: string;

	oneSize: boolean;

	soldOut?: boolean;

	src?: string;

	sizes?: string;

	fetchClothes: () => void;
}

const AdminClothesPanelItem: FC<Props> = ({ name, price, description, sizes, soldOut, fetchClothes, _id}) => {
	const [isShown, setIsShown] = useState<boolean>(false);
	const deleteItem = async (id: string) => {
		await deleteClothe(id);
		await fetchClothes();
	};
	return (
		<div className={styles.panel__item}>
			<ul>
				<li>{name}</li>
				<li>{price}</li>
				<li>{description.substring(0, 20)}...</li>
				<li>{sizes || 'one size'}</li>
				<li>{soldOut ? 'Продан' : 'Не продан'}</li>
			</ul>
			<div className={styles.panel__itemButtons}>
				<Button color='primary' onClick={() => setIsShown(true)}>✎</Button>
				<Button color='danger' onClick={() => deleteItem(_id)}>╳</Button>
			</div>
			<Modal toggle={() => setIsShown(!isShown)} isOpen={isShown}>
				<ModalHeader toggle={() => setIsShown(!isShown)}>Изменить вещь</ModalHeader>
				<ModalBody>
					<UpdateClothesModal setIsShown={setIsShown} fetchClothes={fetchClothes} id={_id}/>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default AdminClothesPanelItem;
