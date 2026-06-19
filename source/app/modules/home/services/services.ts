import type { AxiosResponse } from "axios";
import axios from "axios";
import type { HomeGetTasksResponseType } from "@app/modules/home/entities/entities";

// Llamadas HTTP tipadas del módulo. El manejo de errores vive en los hooks.
export async function getTasks(): Promise<AxiosResponse<HomeGetTasksResponseType>> {
  return await axios.get("/api/tasks");
}
