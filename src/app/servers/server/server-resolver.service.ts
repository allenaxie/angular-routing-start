import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';

interface ServerType {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<ServerType> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ServerType> | Promise<ServerType> | ServerType {
    return this.serversService.getServer(+route.params['id']);
  }
}
