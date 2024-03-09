import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right" duration={1600}>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast
          key={id}
          {...props}
          className="mx-auto flex w-full rounded-md p-0 px-3 py-3 text-sm shadow-lg md:max-w-[60vw] lg:max-w-[35vw]"
        >
          <div>
            {title && <ToastTitle className="m-0">{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <div className="flex items-center">
            <div className="mr-2">{action}</div>
            <ToastClose className="relative right-0 top-0 m-0 flex border opacity-40" />
          </div>
        </Toast>
      ))}
      <ToastViewport className="m-0 w-[100vw] pt-10" />
    </ToastProvider>
  );
}
