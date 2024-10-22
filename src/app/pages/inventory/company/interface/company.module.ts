export interface Company {
  companyId: number,
  name: string,
  description: string,
  phone: string,
  address: string,
  status: boolean
}

export interface CompanyData {
    message: string;
    data: {
      content: Company[];
      totalElements: number;
    };
}