"use client";

import type { HTMLAttributes, ReactNode } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormProps,
  useForm,
} from "react-hook-form";

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends UseFormProps<TFieldValues, TContext, TTransformedValues> {
  children?: ReactNode;
  onSubmit: SubmitHandler<TTransformedValues>;
  formProps?: HTMLAttributes<HTMLFormElement>;
}

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
  Props extends FormProps<
    TFieldValues,
    TContext,
    TTransformedValues
  > = FormProps<TFieldValues, TContext, TTransformedValues>,
>({
  children,
  onSubmit,
  formProps = {},
  ...initialOptions
}: Props) => {
  const options = {
    ...initialOptions,
    mode: initialOptions?.mode ?? "all",
  };
  const form = useForm<TFieldValues, TContext, TTransformedValues>(options);

  return (
    <FormProvider {...form}>
      <form {...formProps} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
