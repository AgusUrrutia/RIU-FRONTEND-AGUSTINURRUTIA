import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';
//TODO: los interceptores, solo funcionan con httpClient, entonces el servicio LoadingService, debe ser un servicio que se encargue de mostrar y ocultar el loading en la aplicación, por ejemplo, con un spinner o un overlay.
//// Este interceptor se encarga de mostrar un loading mientras se realiza una petición HTTP y ocultarlo al finalizar la petición.
// Entonces al no tener un servicio que tenga peticiones http, no se va a ver el loading, pero si se puede probar con un servicio que tenga peticiones http, como el servicio de héroes que ya existe en la aplicación.

//Desde mi punto de vista, no puedo probar este interceptor, ya que no tengo un servicio que tenga peticiones http

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
