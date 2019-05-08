import { Injectable }                                  from '@angular/core';
import { HttpClient }                                  from '@angular/common/http';
import { Evento, PermisosPorEvento, Promotor, Puerta } from './admin.model';
import { BehaviorSubject, Observable }                 from 'rxjs';

interface DataInterface {
    promotores: BehaviorSubject<Promotor[]>;
    eventos: BehaviorSubject<Evento[]>;
}

@Injectable({providedIn: 'root'})
export class AdminService {
    public data: DataInterface = {
        promotores: new BehaviorSubject([]),
        eventos: new BehaviorSubject([])
    };

    private endpoints = {
        promotores: '/api/users/promotores',
        puertas: '/api/users/puertas',
        eventos: '/api/events'
    };

    constructor(private _HttpClient: HttpClient) {}

    fetchPromotores (): void {
        this._HttpClient.get(this.endpoints.promotores).subscribe(response => {
            this.data.promotores.next(<Promotor[]>response);
        });
    }

    fetchEventos (): void {
        this._HttpClient.get(this.endpoints.eventos).subscribe(response => {
            this.data.eventos.next(<Evento[]>response);
        });
    }

    getEvento (eventoId: string): Observable<any> {
        return this._HttpClient.get(`${this.endpoints.eventos}/${eventoId}`);
    }

    addPromotor (payload: Promotor): Observable<any> {
        return this._HttpClient.post(this.endpoints.promotores, payload);
    }


    addPuerta (payload: Puerta, eventoId: string): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.puertas}/${eventoId}`, payload);
    }

    addEvento (payload: any): Observable<any> {
        return this._HttpClient.post(this.endpoints.eventos, payload);
    }

    updatePromotor (payload: Promotor): Observable<any> {
        return this._HttpClient.put(`${this.endpoints.promotores}/${payload._id}`, payload);
    }

    updateEvento (payload: any): Observable<any> {
        return this._HttpClient.put(`${this.endpoints.eventos}/${payload._id}`, payload);
    }

    updateEventoBoxesmap (eventId: string, boxesmap: string): Observable<any> {
        return this._HttpClient.put(`${this.endpoints.eventos}/${eventId}/boxesmap`, {boxesmap});
    }

    updatePermisosPromotorEvento (promotorId: string, eventoId: string, permisos: PermisosPorEvento): Observable<any> {
        return this._HttpClient.put(`${this.endpoints.promotores}/${promotorId}/permisos/${eventoId}`, permisos);
    }

    deletePromotor (payload: Promotor): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.promotores}/${payload._id}`);
    }

    deleteEvento (payload: Evento): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.eventos}/${payload._id}`);
    }

    addInvitadosToEvento (payload: any): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${payload.eventId}/invitados/${payload.promotorId}`, {invitados: payload.invitados});
    }

    addPromotorToEvento (eventId: string, promotorId: string): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${eventId}/promotores/${promotorId}`, {});
    }

    addBoxToEvento (eventId: string, payload: any): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${eventId}/boxes`, payload);
    }

    updateBox (eventId: string, payload: any): Observable<any> {
        return this._HttpClient.put(`${this.endpoints.eventos}/${eventId}/boxes/${payload._id}`, payload);
    }

    reservarBox (eventId: string, payload: any): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${eventId}/boxes/reservar`, payload);
    }

    reclamarBox (eventId: string, boxId: any): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${eventId}/boxes/reclamar`, {boxId});
    }

    marcarIngresoInvitado (eventId: string, invitadoId: any): Observable<any> {
        return this._HttpClient.post(`${this.endpoints.eventos}/${eventId}/ingreso`, {invitadoId});
    }

    deleteBoxFromEvento (eventId: string, boxId: string): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.eventos}/${eventId}/boxes/${boxId}`);
    }

    deleteInvitadoFromEvento (eventId: string, boxId: string): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.eventos}/${eventId}/invitados/${boxId}`);
    }

    deletePromotorFromEvento (eventId: string, promotorId: string): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.eventos}/${eventId}/promotores/${promotorId}`, {});
    }

    deletePuerta (eventId: string, puertaId: string): Observable<any> {
        return this._HttpClient.delete(`${this.endpoints.puertas}/${puertaId}/${eventId}`, {});
    }
}
