import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { USER_INFO } from 'src/app/constants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  destroyed$ = new Subject();
  error$ = new Subject();
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.error$.complete();
  }

  handleLogin(): void {
    if (this.loginForm.value.email) {
      this.authService
        .login({ email: this.loginForm.value.email })
        .pipe(
          takeUntil(this.destroyed$),
          tap((data) => {
            if (data.length > 0) {
              localStorage.setItem(USER_INFO, JSON.stringify(data));
              this.router.navigate(['home']);
              this.error$.next(false);
            } else {
              this.error$.next(true);
              this.router.navigate(['/']);
            }
          })
        )
        .subscribe();
    }
  }
}
