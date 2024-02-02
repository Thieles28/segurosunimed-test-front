import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Token } from '../model/token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  declare userForm: FormGroup;
  message: boolean = false;

  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router) {
    this.initializeForm();
  }


  initializeForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registerNewUser() {
    this.authService.registerUsers(this.userForm.value).subscribe(
      (res: Token) => {
        if(res != null) {
            localStorage.setItem('token', res.token);
            this.showMessage(3000)
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
        }
        this.resetForm();
      },
      (erro) => {
        console.error('Erro ao cadastrar usuário:', erro);
      }
    );
  }

  resetForm() {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.setValue(null, { onlySelf: true, emitEvent: false });
      this.userForm.get(key)?.clearValidators();
      this.userForm.get(key)?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }

  showMessage(duration: number): void {
    this.message = true;

    setTimeout(() => {
      this.message = false;
    }, duration);
  }
}
