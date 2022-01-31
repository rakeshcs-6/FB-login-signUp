import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from './service/notification.service';
import { AuthService } from './service/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  LoginForm!: FormGroup;
  SignUpForm!: FormGroup

  success: boolean = false
  createAccount = false
  worngPssword: boolean = false
  spinner: boolean = false


  @ViewChild('hide') Hide!: ElementRef
  constructor(private formBuilder: FormBuilder, private render: Renderer2, private route: Router, private notify: NotificationService, private auth: AuthService) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group(
      {
        email: [''],
        password: [''],
      },

    );

    this.SignUpForm = this.formBuilder.group(
      {
        email_new: [''],
        password_new: [''],
      },

    );


  }
  SignUp() {
    this.auth.newUser(this.SignUpForm.value.email_new, this.SignUpForm.value.password_new).subscribe((res) => {
      if (res) {
        this.notify.showSuccess("ACCOUNT CREATED", "Success")
      }
    }, (error) => {
      if (error) {
        this.notify.showError(error.error.error.message, "Error")
      }
    })
  }

  Login() {
    this.auth.signIn(this.LoginForm.value.email, this.LoginForm.value.password).subscribe((res) => {
      if (res) {
        this.notify.showSuccess("LOGIN SUCCESS", "Success")
        this.spinner = true
        this.render.addClass(this.Hide.nativeElement, 'hide',);
        setTimeout(() => {
          this.spinner = false;
          this.render.addClass(this.Hide.nativeElement, 'hide',);
          this.route.navigate(['/home'])

        }, 1000);
      }
    }, (error) => {
      if (error) {
        this.notify.showError(error.error.error.message, "Error")
      }
    })
  }



}


