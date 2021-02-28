import axios from 'axios';

export const inventoryList = {
    getInventoryList:(params:{}) => axios.get(`http://localhost:8000/inventory/instrument/`, {params})
}