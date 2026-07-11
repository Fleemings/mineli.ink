import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Exemplo de serviço que utiliza as variáveis de ambiente
 * Este arquivo demonstra como acessar as configurações do ambiente
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiTimeout = environment.apiTimeout;

  constructor(private http: HttpClient) {
    if (environment.production) {
      console.log('🔒 Modo PRODUÇÃO ativado');
    } else {
      console.log('🔧 Modo DESENVOLVIMENTO ativado');
    }
  }

  /**
   * Realiza uma chamada GET à API
   * @param endpoint O endpoint da API (sem a base URL)
   * @returns Observable com a resposta
   */
  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * Realiza uma chamada POST à API
   */
  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Retorna o URL base da API
   */
  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Verifica se está em modo produção
   */
  isProduction(): boolean {
    return environment.production;
  }
}

