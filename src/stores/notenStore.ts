import { getNoten } from "helper/apicalls_v2";
import { getNoten as getNoten_v1 } from "helper/apicalls";
import { NotenStore } from "types/noten.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";

export const useNotenStore = create<NotenStore>()(
  persist(
    (set, get) => ({
      noten: [],
      init: async (user_v2) => {
        const noten = await getNoten(
          (({ cookies, student_pkz }) => ({ cookies, student_pkz }))(user_v2)
        ).catch(() => {
          throw new Error("Error fetching grades from cis");
        });

        // noten.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        noten.sort(
          (a, b) => moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix()
        );

        set({ noten });
      },
      update_note: (note) => {
        const unmodified_note = get().noten.find((item) => item.internal_id === note.internal_id);
        if (!unmodified_note) return;

        const updated_note = { ...unmodified_note, ...note };

        const updated_noten = get().noten.map((note) =>
          note.internal_id === updated_note.internal_id ? updated_note : note
        );

        set({ noten: updated_noten });
      },
      update: (noten) => {
        set({ noten });
      },
      clear: () => set({ noten: [] }),
    }),
    { name: "noten" }
  )
);
