import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-dialog-customers',
  templateUrl: './dialog-customers.component.html',
  styleUrls: ['./dialog-customers.component.scss']
})
export class DialogCustomersComponent implements OnInit {
  declare customer: Customer;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {customerId: number },
  private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
     if (this.data.customerId != null) {
      this.customerService.getRegisterCustomer(this.data.customerId).subscribe((customer: Customer) => {
        this.customer = customer;
      });
    }
  }
}
