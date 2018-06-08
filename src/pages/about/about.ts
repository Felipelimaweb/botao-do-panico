import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App } from 'ionic-angular';
import { ContactProvider } from './../../providers/contact/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  title: string;
  form: FormGroup;
  contact: any;

    constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ContactProvider,
    private toast: ToastController,public db: AngularFireDatabase,public appCtrl: App) {


      
      this.contact = this.navParams.data.contact || {};
      this.provider.get(localStorage.getItem('uid')).subscribe(res=>{
        this.form.setValue(res);
      })
      this.createForm();
 
    
      this.setupPageTitle();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.contact ? 'Ao' : 'No';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nome: [this.contact.nome, Validators.required],
      telefone: [this.contact.telefone, Validators.required],
      email: [this.contact.email, Validators.required],
    });
  }


  Deslogar() {
    localStorage.clear()
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
