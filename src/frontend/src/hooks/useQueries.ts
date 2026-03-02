import { useMutation, useQuery } from "@tanstack/react-query";
import type { RestaurantInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useRestaurantInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantInfo>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Bella Cucina",
          tagline: "Authentic Flavors, Timeless Tradition",
          address: "123 Trattoria Lane, Rome District",
          phone: "+1 (555) 012-3456",
          email: "hello@bellacucina.com",
          openingHours: "Mon–Sun: 11:00 AM – 10:00 PM",
        };
      }
      return actor.getRestaurantInfo();
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, message);
    },
  });
}
