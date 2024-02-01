import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { Users } from '../model/users';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'password', 'actions'];

  declare usuarios: Array<Users>;
  dataSource = new MatTableDataSource<Users>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.returnAllUsersRegisters();
  }

  returnAllUsersRegisters() {
    this.authService.listUsers().subscribe(
      (usuarios: Array<Users>) => {
        if(usuarios != null) {
          this.dataSource.data = usuarios;
        }
      },
      (erro) => {
        console.error('Erro ao retorna usuários:', erro);
      }
    );
  }

  // Método para obter classes com base nas permissões
  getBadgeClasses(perfil: string) {
    return {
      'badge-success': perfil === 'USER',
      'badge-danger':  perfil === 'ADMIN'
    };
  }

  editUser(id: Number) {
    this.router.navigate(['/updateUser', id]);
  }

  removeUser(id: Number) {
    this.authService.removeUser(id).subscribe(() => {
      this._snackBar.open('Usuário removido com sucesso!', 'Fechar', {
        panelClass: 'success-snackbar',
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.returnAllUsersRegisters();
    });
  }

  registerNewUser() {
    this.router.navigate(['/registerUser']);
  }

}
