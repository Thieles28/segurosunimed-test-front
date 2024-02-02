import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Users } from '../model/users';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  declare id: number;
  declare userForm: FormGroup;
  message: boolean = false;
  messageUpdate: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getId();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  registerNewUser() {
    this.authService.registerUser(this.userForm.value).subscribe(
      (users: Users) => {
        if(users != null) {
          this.showMessage(3000);
        }
        this.resetForm();
      },
      (erro) => {
        console.error('Erro ao cadastrar usuarios:', erro);
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

  private getId() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        const id = params.get('id');
        if (id !== null && id !== undefined) {
          this.id = parseInt(id, 10);
          this.authService.getUser(this.id).subscribe((user: Users) => {
              this.userForm.patchValue(user);
          });
        }
      }
    });
  }

  updateUser(){
    if (this.userForm.valid) {
      this.authService.updateUser(this.id, this.userForm.value).subscribe((user: Users) => {
        if (user != null) {
          this.showMessage(3000);
          this.userForm.patchValue(user);
          this.router.navigate(['/users']);
        }
      });
    }
  }

  showMessage(duration: number): void {
    this.message = true;

    setTimeout(() => {
      this.message = false;
    }, duration);
  }

}
