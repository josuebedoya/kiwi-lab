import { defineAction } from "astro:actions";
import { migrateModelMenu } from "@/server/database/menu/modelMigration.ts";
import {migrateFieldsMenu} from "@/server/database/menu/fieldsMigration.ts";

export const server = {
  migrateMenu: defineAction({
    accept: "json",
    handler: async (data) => {
      const result = await migrateModelMenu();
      return { ok: true, result };
    },
  }),
  migrateFields: defineAction({
    accept: "json",
    handler: async (data) => {
      const result = await migrateFieldsMenu();
      return { ok: true, result };
    },
  }),
};