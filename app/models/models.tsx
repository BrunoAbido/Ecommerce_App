class ItemModel {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  image: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.category = data.category;
    this.categoryId = data.categoryId;
    this.image = data.image;
  }
}

export default ItemModel;
