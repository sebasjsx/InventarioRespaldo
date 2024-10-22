export interface Winery {
  id: number;
  name: string;
  address: string;
  phone: string;
  maxCapacity: number;
  availableQuantity: number;
  status: boolean;
}

export interface WineryData {
  message: string;
  data: {
    content: Winery[];
    totalElements: number;
  };
}
