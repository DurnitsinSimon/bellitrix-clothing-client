import React from 'react';
import AdminOrderPanel from '../../components/AdminOrderPanel/AdminOrderPanel';
import AdminLayout from '../../layouts/AdminLayout';

const orders = () => {
    return (
        <AdminLayout>
            <AdminOrderPanel />
        </AdminLayout>
    );
};

export default orders;