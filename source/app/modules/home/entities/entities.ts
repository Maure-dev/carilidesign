import type { Dispatch, SetStateAction } from "react";

// Entidad de dominio del módulo.
export type TaskType = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

// Estado completo de la página (un único objeto por módulo).
export type HomeDataType = {
  loading: boolean;
  data: TaskType[];
  filters: {
    search: string;
  };
};

// Par getter/setter expuesto por el provider.
export type HomeContextType = {
  getHomeState: HomeDataType;
  setHomeState: Dispatch<SetStateAction<HomeDataType>>;
};

// Tipos de servicios.
export type HomeGetTasksResponseType = {
  data: TaskType[];
};
