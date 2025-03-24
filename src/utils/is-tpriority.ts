import { EPriorities } from "../store/reducers/TasksReducer.ts";

export function isTPriority(value: number): value is EPriorities {
  return [0, 1, 2].includes(value);
}
