import { TestBed } from '@angular/core/testing';

import { KeycloakInterceptorSecurityService } from './keycloak-interceptor-security.service';

describe('KeycloakInterceptorSecurityService', () => {
  let service: KeycloakInterceptorSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakInterceptorSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
