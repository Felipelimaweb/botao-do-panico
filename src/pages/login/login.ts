import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistroPage } from '../registro/registro';
import { ContactProvider } from '../../providers/contact/contact';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  usuario:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public modalCtrl: ModalController,public provider:ContactProvider) {
    this.form = this.formBuilder.group({

      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(){
    console.log('vai logar')
    let email = this.form.value.email;
    let senha = this.form.value.senha;
    this.provider.login(email,senha).then(res=>{
      this.navCtrl.setRoot(TabsPage);
    }).catch(err=>console.log(err));


  }

  goToRegistrar(){
    this.navCtrl.push(RegistroPage);
  }

}
