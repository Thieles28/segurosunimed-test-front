import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
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

  addAddress(address?: Address) {
    const addresFormGroup = this.fb.group({
      zipCode: [address?.zipCode || '', Validators.required],
      street: [{ value: address?.street || '', disabled: true }, Validators.required],
      city: [{ value: address?.city || '', disabled: true }, Validators.required],
      state: [{ value: address?.state || '', disabled: true }, Validators.required]
    });
    this.addresses.push(addresFormGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }


  getAddressFormGroup(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }

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
          this.showMessage(3000);
        }
        this.resetForm();
      },
      (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
      }
    );
  }

  resetControl(control: AbstractControl | null) {
    if (control) {
      control.setValue(null);
      control.clearValidators();
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  resetForm() {
    const addressesArray = this.customerForm.get('addresses') as FormArray;

    if (addressesArray) {
      addressesArray.controls.forEach((address: AbstractControl) => {
        if (address instanceof FormGroup) {
          this.resetControl(address.get('zipCode') as FormControl | null);
          this.resetControl(address.get('street') as FormControl | null);
          this.resetControl(address.get('city') as FormControl | null);
          this.resetControl(address.get('state') as FormControl | null);
        }
      });
    }

    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      this.resetControl(control);
    });
  }

  resetZipCodes() {
    const addressesArray = this.customerForm.get('addresses') as FormArray;
    addressesArray.controls.map((addresses: AbstractControl) => {
      const zipCode = (addresses as FormGroup).get('zipCode') as FormControl;
        if (zipCode) {
          zipCode.setValue(null, { onlySelf: true, emitEvent: false });
          zipCode.clearValidators();
          zipCode.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
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
            customer.addresses.map((address: Address) => {
              this.addAddress(address);
            });
          });
        }
      }
    });
  }

  updateCustomer(){
    if (this.customerForm.valid) {
      this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe((customer: Customer) => {
        if (customer != null) {
          this.showMessage(3000);
          this.customerForm.patchValue(customer);
          this.router.navigate(['/customers']);
        }
      });
    }
  }

  showMessage(duration: number): void {
    this.mensagem = true;

    setTimeout(() => {
      this.mensagem = false;
    }, duration);
  }
}
