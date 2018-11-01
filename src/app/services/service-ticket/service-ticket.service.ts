import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceTicket } from '../../models/service-ticket';
import { refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceTicketService {

  private serviceTicketCollection: AngularFirestoreCollection<ServiceTicket>;

  constructor(private afs: AngularFirestore) {
    this.serviceTicketCollection = afs.collection<ServiceTicket>('service-ticket');
  }

  createNewServiceTicket(serviceTicket: ServiceTicket): Promise<void> {
      return this.serviceTicketCollection
        .doc(serviceTicket.serviceTicketID)
        .set(Object.assign({}, serviceTicket));
  }

  // By UserID
  getProgressServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Progress').where('userID', '==', uid);
      }).valueChanges();
  }

  getCompletedServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Completed').where('userID', '==', uid);
      }).valueChanges();
  }

  getServiceticketsByUserID(uid: string): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('userID', '==', uid);
    }).valueChanges();
  }

  // By AptID - replace with [apartmentID] when apartmentID is available
  getProgressServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Progress').where('userID', '==', aptid);
      }).valueChanges();
  }

  getCompletedServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
      return this.afs.collection<ServiceTicket>('service-ticket', ref => {
        return ref.where('ticketStatus', '==', 'Completed').where('userID', '==', aptid);
      }).valueChanges();
  }

  getServiceticketsByAptID(aptid: string): Observable<ServiceTicket[]> {
    return this.afs.collection<ServiceTicket>('service-ticket', ref => {
      return ref.where('userID', '==', aptid).orderBy('dateCreated', 'desc');
    }).valueChanges();
  }

  getServiceTicketByApt() {

  }

  getAllServiceTicketsID(): Observable<ServiceTicket[]> {
    return this.serviceTicketCollection
      .valueChanges();
  }

  getOneServiceTicket(serviceTicketID: string): Observable<any> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .valueChanges();
  }

  updateServiceTicket(serviceTicketObj: any): Promise<void> {
    const serviceTicketID = serviceTicketObj.serviceTicketID;
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .update(serviceTicketObj);
  }

  deleteServiceTicket(serviceTicketID: string): Promise<void> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .delete();
  }

}
