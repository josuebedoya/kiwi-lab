import {defineAction} from "astro:actions";
import {migrateModelMenu} from "@/server/database/menu/modelMigration.ts";
import {migrateFieldsMenu} from "@/server/database/menu/fieldsMigration.ts";
import {migrateModelInfoContact} from "@/server/database/info_contact/modelMigration.ts";
import {migrateFieldsInfoContact} from "@/server/database/info_contact/fieldsMigration.ts";

const migrations = {
  migrateModelMenu,
  migrateFieldsMenu,
  migrateModelInfoContact,
  migrateFieldsInfoContact,
} as const;

export const server = Object.fromEntries(
  Object.entries(migrations).map(([name, fn]) => [
    name,
    defineAction({
      accept: "json",
      handler: async () => {
        const result = await fn();
        return {ok: true, result};
      },
    }),
  ])
);
