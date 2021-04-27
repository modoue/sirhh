import { Authority } from "./authority.model";

export interface IUser {
    id?: string;
    login?: string;


    firstName?: string;
    lastName?: string;
     email?: string;
    activated?:Boolean
    langKey?: string;
    imageUrl?: string;
    authorities?:Authority[]

  }
  
  export class User implements IUser {
    constructor(public id?: string, public login?: string,public firstName?:string,public lastName?:string,public email?:string,public activated?:Boolean,public langKey?:string,public imageUrl?:string,public authorities?:Authority[]) {}
  }
 
  