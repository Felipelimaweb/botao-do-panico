import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactProvider } from './../../providers/contact/contact';

import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  title: string;
  form: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    private provider: ContactProvider, private toast: ToastController) {

    this.usuario = this.navParams.data.usuario || {};
    this.setupPageTitle

    this.form = this.formBuilder.group({

      email: [this.usuario.email, Validators.required],
      senha: [this.usuario.senha, Validators.required],
      nome: [this.usuario.nome, Validators.required],
      telefone: [this.usuario.telefone, Validators.required]

    });
  }


  private setupPageTitle() {
    this.title = this.navParams.data.usuario ? 'Alterando Usuario' : 'Novo Usuario';
  }

  createForm() {

  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.register(this.form.value).then(resolve=>{
        this.navCtrl.setRoot(TabsPage);
      }).catch(err=>{
        console.log(err);
      })
      
    }
  }
}
