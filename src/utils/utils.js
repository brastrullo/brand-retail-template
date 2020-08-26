
import data from '../../mockInventory.json';

const getInventoryData = () => data.inventory;
export const mockItems = data.unsplash;
export const getItemObj = (refId) => getInventoryData().find(item => item.refId.toString() === refId.toString());
