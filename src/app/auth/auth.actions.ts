
import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
  '[Auth] set User',
  props<{ user: Usuario }>()
);

export const unSetUser = createAction('[Auth] Unset User');
