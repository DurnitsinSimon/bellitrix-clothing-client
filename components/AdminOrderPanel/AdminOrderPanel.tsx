import React, { FC, useEffect, useState } from 'react';
import { findAllOrders } from '../../services/order/order';
import { Order } from '../../types/order';
import mainStyles from '../../styles/AdminLayout.module.scss';
import panelStyles from '../../styles/AdminPanel.module.scss';
import AdminOrderPanelItem from './AdminOrderPanelItem';

const AdminOrderPanel: FC = (): JSX.Element => {
    const [error, setError] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [params] = useState<string[]>(['Адрес', 'Почта', 'ФИО', 'Телефон', 'Количество', 'Дата']);

    const fetchOrders = async () => {
        try {
            const orders = await findAllOrders();
            setOrders(orders);
        } catch (e) {
            setError(true);
        }
    };
    
    
    const reverseOrders = orders.reverse();

    if(error) {
        return <h1>Ошибка</h1>;
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className={`${mainStyles.adminLayout__mainContent}`}>
            <div className={panelStyles.panel__header}>
				<ul>
					{params.map((param, i) => (
						<li key={i}>{param}</li>
					))}
				</ul>
			</div>
            <div className={panelStyles.panel__content}>
				{reverseOrders.map((order) => (
					<AdminOrderPanelItem key={order._id} {...order}/>
				))}
			</div>
        </div>
    );
};

export default AdminOrderPanel;