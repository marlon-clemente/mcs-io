"use client";
import * as Form from "@radix-ui/react-form";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type LabelProps = Form.FormLabelProps & RefAttributes<HTMLLabelElement>;

export const Label: ForwardRefExoticComponent<LabelProps> = React.forwardRef(
  (props, ref) => <Form.Label className="font-semibold" ref={ref} {...props} />
);

Label.displayName = "Label";
