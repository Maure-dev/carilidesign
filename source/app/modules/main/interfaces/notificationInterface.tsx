import { useEffect } from "react";
import { useMainProvider } from "@app/modules/main/states/mainProvider";

const AUTO_CLOSE_MS = 4000;

// Renderiza la notificación global y la cierra automáticamente.
export default function NotificationInterface() {
  const { getMainState, setMainState } = useMainProvider();
  const { notification } = getMainState;

  useEffect(() => {
    if (!notification.open) {
      return;
    }
    const timer = setTimeout(() => {
      setMainState((s) => ({
        ...s,
        notification: { ...s.notification, open: false }
      }));
    }, AUTO_CLOSE_MS);

    return () => clearTimeout(timer);
  }, [notification.open, setMainState]);

  if (!notification.open) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 rounded-buttons px-4 py-3 text-white shadow-lg ${
        notification.status ? "bg-success" : "bg-error"
      }`}
    >
      {notification.message}
    </div>
  );
}
