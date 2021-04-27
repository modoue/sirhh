import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc:any;
  
  constructor() {
   }
  public async init(){
    console.log("Initialisation du keycloak")
     this.kc=
      Keycloak({
       url:"http://localhost:9080/auth/",
       realm:"jhipster",
       clientId:"front"
     })
     await this.kc.init({
       onLoad:"login-required",
    // onload:"chek-sso"
      

     }),
     console.log(this.kc.token);

   }
  
  
}
