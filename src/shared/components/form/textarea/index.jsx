import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@nextui-org/react';


const TextareaField = ({ name, commaSeprated, ...rest }) => {
  const methods = useFormContext();
  const { getValues, setValue, watch, formState, clearErrors } = methods;
  const isInvalid = formState?.errors?.[name];
  useEffect(() => {
    if (getValues(name)) {
      clearErrors(name);
    }
  }, [watch(name)]);
  return (
    <Textarea
      error={isInvalid}
      helperText={formState.errors?.[name]?.message}
      onChange={(e) => {
          setValue(name, e.target.value);
      }}
      value={commaSeprated ? showValue : getValues(name)}
      {...rest}
    />
  );
};

export default TextareaField;
