export interface Purchase {
    id: number;
    quantity: number;
    wineryName: string; 
    productId: number[];
}

export interface PurchaseData {
    message: string;
    data: {
    content: Purchase[];
    totalElements: number;
    };
}