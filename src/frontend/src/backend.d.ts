import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    phone: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getBookings(): Promise<Array<Booking>>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    submitBooking(name: string, email: string, phone: string, preferredDate: string, serviceType: string, message: string): Promise<void>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<void>;
}
