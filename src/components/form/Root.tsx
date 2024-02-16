import * as Form from "@radix-ui/react-form";

interface RootProps extends Form.FormProps {
  children: React.ReactNode;
}

export const Root = ({ children, ...props }: RootProps) => {
  return <Form.Root {...props}>{children}</Form.Root>;
};
