import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { DialogCustomersComponent } from './dialog-customers/dialog-customers.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'gender', 'addresses', 'city', 'state', 'acoes'];
  declare customer: Array<Customer>;
  dataSource = new MatTableDataSource<Customer>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCustomersRegister();
  }

  getCustomersRegister() {
    this.customerService.customerRecords().subscribe(
      (customer: Array<Customer>) => {
        if(customer != null) {
          this.dataSource.data = customer;
        }
      },
      (erro) => {
        console.error('Erro ao retorna clientes:', erro);
      }
    );
  }

  viewCustomer(id: Number) {
    const dialogRef = this.dialog.open(DialogCustomersComponent, {
      data: { customerId: id},
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editCustomer(id: Number) {
    this.router.navigate(['/updateCustomer', id]);
  }

  removeCustomer(id: Number) {
    this.customerService.removeCustomer(id).subscribe(() => {
      this._snackBar.open('Cliente removido com sucesso!', 'Fechar', {
        panelClass: 'success-snackbar',
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.getCustomersRegister();
    });
  }
}
