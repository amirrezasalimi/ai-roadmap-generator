import React, { useEffect, useImperativeHandle, useRef } from 'react';
import {
  FormProvider as FormProviderRh,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const FormProvider = React.forwardRef((props, ref) => {
  const methods = useForm({
    defaultValues: props.defaultValues,
    resolver: props.schema ? yupResolver(props.schema) : undefined,
  });
  const refSubmitButton = useRef(null);
  const submit = () => {
    refSubmitButton.current?.click();
  };
  useEffect(() => {
    if (refSubmitButton?.current) {
      props.submitPass?.(submit);
    }
  }, [refSubmitButton?.current]);

  useImperativeHandle(ref, () => ({
    reset() {
      methods?.reset();
    },
  }));

  return (
    <FormProviderRh {...methods}>
      <form
        className={props?.className}
        onSubmit={methods?.handleSubmit((data) => props?.onSubmit(data))}
      >
        {props?.returnToParent && typeof props?.children === 'function'
          ? props?.children?.(methods)
          : props?.children}

        <button hidden={true} ref={refSubmitButton} type={'submit'} />
      </form>
    </FormProviderRh>
  );
});

FormProvider.displayName = 'FormProvider';

export default FormProvider;
