import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Address } from './../model/address';
import { Customer } from './../model/customer';
import { ViaCep } from './../model/viaCep';


@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {
  declare id: number;
  declare customerForm: FormGroup;
  mensagem: boolean = false;
  mensagemAtualizacao: boolean = false;
  address: Address = new Address();

  constructor(private fb: FormBuilder, private customerService: CustomerService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getId();
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.fb.array([])
    });
    this.addAddress();
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  get zip(): FormControl {
    return this.addresses.get('zipCode') as FormControl;
  }

  addAddress() {
    const addresFormGroup = this.fb.group({
      zipCode: ['', Validators.required],
      street: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required]
    });
    this.addresses.push(addresFormGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

   // Suponha que você tenha um método para acessar um endereço específico pelo índice
   getAddressFormGroup(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }

  // Agora, você pode acessar o valor do zipCode para um endereço específico
  getZipCodeValue(index: number) {
    this.customerService.getAddressCep(this.getAddressFormGroup(index).get('zipCode')?.value).subscribe((viaCep: ViaCep) => {
      this.address.street = viaCep.logradouro;
      this.address.city = viaCep.localidade;
      this.address.state = viaCep.uf;
      this.getAddressFormGroup(index).patchValue(this.address);
    });
  }

  registerNewCustomers() {
    this.customerService.registerNewCustomers(this.customerForm.value).subscribe(
      (customerAdd: Customer) => {
        if(customerAdd != null) {
            this.mensagem = true;
        }
        this.resetForm();
      },
      (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
      }
    );
  }

  resetForm() {
    Object.keys(this.customerForm.controls).forEach(key => {
      this.customerForm.get(key)?.setValue(null, { onlySelf: true, emitEvent: false });
      this.customerForm.get(key)?.clearValidators();
      this.customerForm.get(key)?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });

  }

  private getId() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        const id = params.get('id');
        if (id !== null && id !== undefined) {
          this.id = parseInt(id, 10);
          this.customerService.getRegisterCustomer(this.id).subscribe((customer: Customer) => {
              this.customerForm.patchValue(customer);
          });
        }
      }
    });
  }

  updateCustomer(){
    if (this.customerForm.valid) {
      this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe((customer: Customer) => {
        if (customer != null) {
          this.mensagem = true;
          this.customerForm.patchValue(customer);
          this.router.navigate(['/customers']);
        }
      });
    }
  }

}
