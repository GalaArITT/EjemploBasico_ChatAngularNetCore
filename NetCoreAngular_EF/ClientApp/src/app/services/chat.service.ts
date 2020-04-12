import { Injectable, Inject } from '@angular/core';
import { Message, MyResponse } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //public algo: string = "Hola Prro"; //mandar algo de ejemplo
  baseUrl: string;
  constructor(protected http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

  }
  public getMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + "api/Chat/Message");
  }
  public postMessage(name, text) {
    return this.http.post<MyResponse[]>(this.baseUrl + "api/Chat/InsertarDatos",
      { 'Name': name, 'Text': text }, httpOptions)
      .subscribe(result =>
        {
          console.log(result);
        },
          error => console.error(error)
        );
  }
}
