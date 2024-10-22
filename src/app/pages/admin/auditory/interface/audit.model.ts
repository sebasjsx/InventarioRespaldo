export interface Audit {
  id: number;
  entity: string;
  userId: number;
  operation: string;
  httpStatusCode: number;
  dateTime: string;
  username: string;
}

export interface AuditData {
  message: string;
  data: {
    content: Audit[];
    totalElements: number;
    totalPages: number; 
    size: number;
  }
}

export interface AuditDataSearch {
    content: Audit[];
    totalElements: number;
    totalPages: number; 
    size: number;
}