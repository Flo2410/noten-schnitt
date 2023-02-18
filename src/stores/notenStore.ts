import { getNoten } from "helper/apicalls_v2";
import { NotenStore } from "types/noten.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotenStore = create<NotenStore>()(
  persist(
    (set, get) => ({
      noten: [],
      init: async (user) => {
        const noten = await getNoten(
          (({ cookies, student_pkz }) => ({ cookies, student_pkz }))(user)
        ).catch(() => {
          throw new Error("Error fetching grades");
        });

        set({ noten });
      },
      update: (noten) => {
        set({ noten: [...get().noten, ...noten] });
      },
      clear: () => set({ noten: [] }),
    }),
    { name: "noten" }
  )
);
