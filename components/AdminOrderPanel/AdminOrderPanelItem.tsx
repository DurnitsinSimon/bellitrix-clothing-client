import React, { FC, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import styles from '../../styles/AdminPanel.module.scss';
import { Order } from '../../types/order';
import ModalOrder from './ModalOrder';

const AdminOrderPanelItem: FC<Order> = ({address, email, fullName, products, date, phone, _id}) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    return (
        <div className={styles.panel__item}>
			<ul>
				<li>{address.substring(0, 10)}...</li>
				<li>{email}</li>
				<li>{fullName === '' ? 'Не указано' : fullName}</li>
				<li>{phone}</li>
				<li>{products.length || 'one size'}</li>
				<li>{date?.split('T')[0]}</li>
			</ul>
            <div className={styles.panel__itemButtons}>
				<Button color='primary' onClick={() => setIsShown(true)}>🔍︎</Button>
			</div>
            <Modal toggle={() => setIsShown(!isShown)} isOpen={isShown}>
				<ModalHeader toggle={() => setIsShown(!isShown)}>Информация о заказе</ModalHeader>
				<ModalBody>
					<ModalOrder id={_id}/>
				</ModalBody>
			</Modal>
        </div>
    );
};

export default AdminOrderPanelItem;