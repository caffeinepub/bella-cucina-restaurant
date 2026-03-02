import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RestaurantInfo {
    tagline: string;
    name: string;
    email: string;
    address: string;
    openingHours: string;
    phone: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    getContactMessages(): Promise<Array<ContactMessage>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    setRestaurantInfo(name: string, tagline: string, address: string, phone: string, email: string, openingHours: string): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
}
