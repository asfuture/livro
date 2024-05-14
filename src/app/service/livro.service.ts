import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { LivrosResultado} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  
  private readonly API = 'https://www.googleapis.com/books/v1/volumes?'
  constructor( private  http:HttpClient) { }

  buscar(valorDigitidado:string):Observable<LivrosResultado>{
    const params = new HttpParams().append('q',valorDigitidado)
    return this.http.get<LivrosResultado>(this.API, {params})
    //.pipe(
      //tap((retornoAPI) => console.log('Fluxo de tap ',retornoAPI)),
      //map(resultado => resultado.items ?? []),
     // tap(resltado => console.log('Fluxo após o map', resltado))
    //)
  }
}
