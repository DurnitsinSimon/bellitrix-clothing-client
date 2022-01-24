import React from 'react';
import AdminClothesPanel from '../../components/AdminClothesPanel/AdminClothesPanel';
import AdminLayout from '../../layouts/AdminLayout';

const Clothes = () => {
    return (
        <AdminLayout>
            <AdminClothesPanel  />
        </AdminLayout>
    );
};

export default Clothes;