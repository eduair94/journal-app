export enum AuthStatusEnum {
    checking = 'checking',
    notAuthenticated = 'not-authenticated',
    authenticated = 'authenticated'
}

export  interface AuthStateI {
    status: AuthStatusEnum,
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    errorMessage?: string | null
}

export interface UserI {
  ok?:boolean;
  displayName: string;
  email: string;
  photoURL:string;
  uid:string;
  password?:string;
}

export interface UserRI {
  email:string;
  password:string;
  displayName:string;
}

export interface UserLI {
  email:string;
  password:string;
}