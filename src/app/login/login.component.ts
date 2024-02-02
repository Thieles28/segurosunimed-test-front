
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Token } from '../model/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  declare loginForm: FormGroup;
  incorrectPassword = false;
  message: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.inicializarFormulario();
  }

  ngOnInit(): void {
  }

  inicializarFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  authentication() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: Token) => {
        if(res != null) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/registerCustomer']);
        }
      },
      (erro) => {
        console.error('Erro ao autenticar:', erro);
        this.showMessage(3000)
        if (erro.status === 403) {
          this.loginForm.get('password')?.setErrors({ incorrectPassword: true });
        }
      }
    );
  }

  showMessage(duration: number): void {
    this.message = true;

    setTimeout(() => {
      this.message = false;
    }, duration);
  }

}
