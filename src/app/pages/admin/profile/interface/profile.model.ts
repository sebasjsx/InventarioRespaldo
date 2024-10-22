export interface Profile {
  profileId: number;
  name: string;
  description: string;
  status: boolean;
  resource: string[];
}

export interface ProfileData {
  message: string;
  data: {
    content: Profile[];
    totalElements: number;
  };
}
