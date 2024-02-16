import * as Form from "@radix-ui/react-form";

interface MessageProps extends Form.FormMessageProps {
  children: React.ReactNode;
}

export const Message = ({ children }: MessageProps) => (
  <Form.Message className="text-[13px] text-red-500">{children}</Form.Message>
);
