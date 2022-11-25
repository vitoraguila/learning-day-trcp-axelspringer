import { baseProcedure, router } from "../trcp";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

let todoValues: Todo[] = [];

export const todoRouter = router({
  all: baseProcedure.query(() => {
    return todoValues;
  }),
  add: baseProcedure
    .input(
      z.object({
        name: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      todoValues.push({
        id: uuidv4(),
        name: input.name,
        completed: input.completed ?? false,
      });
      return todoValues;
    }),
  edit: baseProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      todoValues = todoValues.map((v) => {
        if (v.id === input.id) {
          return {
            ...v,
            completed: !v.completed,
          };
        }
        return v;
      });

      return todoValues;
    }),
});
