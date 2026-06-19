import type { Dispatch, ReactNode, SetStateAction } from "react";

// Tipo compartido por todos los providers de la app.
export type ChildrenType = { children: ReactNode };

// Notificación global (toast).
export type NotificationType = {
  open: boolean;
  status: boolean;
  message: string;
};

export type MainDataType = {
  notification: NotificationType;
};

export type MainContextType = {
  getMainState: MainDataType;
  setMainState: Dispatch<SetStateAction<MainDataType>>;
};
