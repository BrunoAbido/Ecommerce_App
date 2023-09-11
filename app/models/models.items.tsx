import ItemModel from '../models/models';

class MostPopularModel {
    items: ItemModel[];

    constructor(data: any) {
    this.items = data.map((itemData: any) => new ItemModel(itemData));
    }
}

export default MostPopularModel;
