import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {

    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe( ({items}) => this.ingresosEgresos = items );

  }

  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
  }

  borrar( uid: string ){

    this.ingresoEgresoService.borrarIngresoEgreso( uid )
    .then( () => Swal.fire( 'Borrado', 'Item borrado', 'success' ) )
    .catch( err => Swal.fire( 'Error', err.mesagge, 'error' ) )

  }

}
