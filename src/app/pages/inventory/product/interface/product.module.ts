export interface Product {
  id: number;
  name: string;
  deliveryTime: number;
  barCode: string;
  description: string;
  price: number;
  availableQuantity: number;
  companyId: number;
  categoryId: number;
  status: boolean;
}

export interface ProductData {
  message: string;
  data: {
    content: Product[];
    totalElements: number;
  };
}
