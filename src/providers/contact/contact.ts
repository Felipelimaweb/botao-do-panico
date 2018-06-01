
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ContactProvider {

  private PATH = 'contacts/';

  constructor(private db: AngularFireDatabase,private af: AngularFireAuth) { }

  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  save(contact: any) {
    return new Promise((resolve, reject) => {
      if (contact.key) {
        this.db.list(this.PATH)
          .update(contact.key, { nome: contact.nome, telefone: contact.telefone, email: contact.email })
          .then(() => resolve())
          .catch((e) => reject(e));

      }
      else {
        this.db.list(this.PATH)
          .push({ nome: contact.nome, telefone: contact.telefone, email: contact.email })
          .then(() => resolve());

      }
    });
  }

  register(contact:any) {
    return new Promise((resolve,reject)=>{
      this.af.auth.createUserWithEmailAndPassword(contact.email,contact.senha).then(res=>{
        localStorage.setItem('uid',res.user.uid);
        contact.key = res.user.uid;
        this.save(contact).then(res=>{
          resolve();
        })
      }).catch(err=>reject(err));
    }) 

  }

  login(email,senha){
    return new Promise((resolve,reject)=>{
      this.af.auth.signInWithEmailAndPassword(email,senha).then(res=>{
        localStorage.setItem('uid',res.user.uid);
        resolve();        
      }).catch(err=>reject(err));
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);

  }
}
