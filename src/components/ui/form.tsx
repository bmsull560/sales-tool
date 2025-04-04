'use client';

import * as React from 'react';
import { useForm, UseFormReturn, FieldValues, SubmitHandler, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface FormProps<TFormValues extends FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
}

const Form = <TFormValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<TFormValues>) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className={className} {...props}>
    {children}
  </form>
);

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends string = string
> = {
  name: TName;
  form: UseFormReturn<TFieldValues>;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends string = string
>({
  name,
  form,
  children,
}: {
  name: TName;
  form: UseFormReturn<TFieldValues>;
  children: React.ReactNode;
}) => {
  return (
    <FormFieldContext.Provider value={{ name, form }}>
      {children}
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  
  if (!fieldContext) {
    throw new Error('useFormField must be used within a FormField');
  }
  
  const { name, form } = fieldContext;
  const fieldState = form.getFieldState(name);
  
  return {
    id: name,
    name,
    formItemId: `${name}-form-item`,
    formDescriptionId: `${name}-form-item-description`,
    formMessageId: `${name}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    );
  }
);
FormItem.displayName = 'FormItem';

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    
    return (
      <Label
        ref={ref}
        className={cn(error && 'text-red-500', className)}
        htmlFor={formItemId}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

interface UseZodFormProps<Z extends z.ZodType> extends Omit<UseFormProps<z.infer<Z>>, 'resolver'> {
  schema: Z;
}

const useZodForm = <Z extends z.ZodType>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) => {
  return useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormField,
  useZodForm,
};
