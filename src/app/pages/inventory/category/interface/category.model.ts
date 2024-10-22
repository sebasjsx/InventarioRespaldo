export interface Category {
  categoryId: number;
  name: string;
  description: string;
  status: boolean;
}

export interface CategoryData {
  message: string;
  data: {
    content: Category[];
    totalElements: number;
  };
}
