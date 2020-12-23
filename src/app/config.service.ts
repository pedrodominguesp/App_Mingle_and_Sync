import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  saveConfig(environment, alias, idApp): void {
    this.setEnvironment(environment);
    this.setAlias(alias)
    this.setIdApp(idApp)
  }

  getEnvironment(): string {
    return localStorage.getItem("environment");
  }

  getEnvironmentURL(): string {
    let env = this.getEnvironment();
    switch (env) {
      case '1':
        env = 'http://localhost:80/api';
        break;
      case '2':
        env = 'https://dev-mingle.totvs.com.br/api';
        break;
      case '3':
        env = 'https://hom-mingle.totvs.com.br/api';
        break;
      case '4' :
        env = 'https://mingle.totvs.com.br/api';
        break;
    }
    return env;
  }

  private setEnvironment(value: string): void {
  
    localStorage.setItem("environment", value);
  }

  getAlias(): string {
    return localStorage.getItem("alias")
  }

  private setAlias(value: string): void {
    localStorage.setItem("alias", value);
  }

  getIdApp(): string {
    return localStorage.getItem("idApp")
  }

  private setIdApp(value: string): void {
    localStorage.setItem("idApp", value);
  }

}
