import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      preferredDate,
      serviceType,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      preferredDate: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(
        name,
        email,
        phone,
        preferredDate,
        serviceType,
        message,
      );
    },
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, phone, message);
    },
  });
}
