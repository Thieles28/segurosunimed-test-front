import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';
import { Address } from '../model/address';
import { ViaCep } from '../model/viaCep';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl;
  private baseUrlCep = environment.apiViaCep;

  constructor(private http: HttpClient) { }

  registerNewCustomers(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customer);
  }

  customerRecords(): Observable<Array<Customer>> {
    // const params = new HttpParams()
    // .set('page', page.toString())
    // .set('size', size.toString());
    return this.http.get<Array<Customer>>(`${this.baseUrl}/customers`);
  }

  getRegisterCustomer(id: Number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  getAddressCep(cep: String): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.baseUrlCep}/${cep}/json`);
  }

  updateCustomer(id: Number, Customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${id}`, Customer);
  }

  removeCustomer(id: Number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/customers/${id}`);
  }
}
