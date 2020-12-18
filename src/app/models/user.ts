export interface UserCredential {
  email: string;
  password: string;
}

export interface UserProfile {
  email: string;
  fullName: string;
  lat:number;
  lng:number;
  friend:friend[];
}

export interface friend {
  email: string;
  fullName: string;
  lat:number;
  lng:number;
}
