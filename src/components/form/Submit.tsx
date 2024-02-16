import * as Form from "@radix-ui/react-form";

interface SubmitProps extends Form.FormSubmitProps {
  children: React.ReactNode;
}

export const Submit = ({ children }: SubmitProps) => (
  <Form.Submit asChild>{children}</Form.Submit>
);
