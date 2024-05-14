import { FormControl } from '@angular/forms';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { switchMap, map, tap, filter, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  
  campoBusca = new FormControl();
  mensagemErro ='';
  livrosResultado: LivrosResultado

  constructor( private livroService:LivroService) { }

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado ),
    catchError(erro => {
      console.log(erro)
      return of()
    }) 
  )

  livrosEncotrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    tap((retornoAPI) => console.log('Requisição ao servidor',retornoAPI)),
    map(resultado => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      // return throwError(()=> new Error(this.mensagemErro = 'Ops ocorreu um erro, Recarregue a aplicação!'))
      // return EMPTY
       console.log(erro)
       return throwError(()=> new Error(this.mensagemErro = 'Ops ocorreu um erro, Recarregue a aplicação!'))
    })
  )
    

  livrosResultadoParaLivros(items:Item[]): LivroVolumeInfo[] {
    return items.map(item => {
    return new LivroVolumeInfo(item)
    })
  
  }
}



