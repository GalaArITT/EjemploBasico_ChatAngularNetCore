import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { Message } from '../Interfaces';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'chat-app',
  templateUrl:'./chat.component.html'
})
export class ChatComponent {

  public ListaMensajes: Observable<Message[]>;

  textControl = new FormControl(''); //ligar los forms control del chat.component.ts 
  nameControl = new FormControl('');
  @ViewChild('text') text: ElementRef;

  /*constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get<Message[]>(baseUrl + "api/Chat/Message").subscribe(result => {

      this.ListaMensajes = result;
    }, error => console.error(error));
  }*/
  //mandar llamar un servicio

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string, protected chatService: ChatService) {
    this.GetInfo();
  }
  public GetInfo() {
    this.ListaMensajes = this.chatService.getMessage();
  }
  public EnviarMensaje() {
    this.chatService.postMessage(this.nameControl.value, this.textControl.value);
    setTimeout(() => {
      this.GetInfo();
    }, 300);

    this.textControl.setValue('');
    this.text.nativeElement.focus();
  }

}

/*interface Message {
  id: number;
  name: string,
  text: string
}*/ 


  //public nombre = "Oliver Jasiel Galaviz Arroyo";
  //public CambiarNombre() {
  //  this.nombre = "oliver.jga@gmail.com";
  //}
  //public ListaMensajes: string[] = ["Hola mundo", "El joey", "La bigo", "otro mas", "quinto elemento"];
  //LLENAR EL OBJETO CON UNA CONSULTA
