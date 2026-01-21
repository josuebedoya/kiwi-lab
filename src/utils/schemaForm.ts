import {z} from "zod";

const fieldDefs = {
  name: "string",
  age: "number",
  email: "email",
  active: "boolean",
};

// Build schema
const dynamicSchema = z.object(
  Object.fromEntries(
    Object.entries(fieldDefs).map(([key, type]) => {
      switch (type) {
        case "string":
          return [key, z.string().min(1)];
        case "number":
          return [key, z.coerce.number()];
        case "email":
          return [key, z.string().email()];
        case "boolean":
          return [key, z.coerce.boolean()];
        default:
          return [key, z.any()];
      }
    })
  )
);

export {dynamicSchema};