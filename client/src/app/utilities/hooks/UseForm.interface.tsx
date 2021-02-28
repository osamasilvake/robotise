import { ChangeEvent, FocusEvent, FormEvent } from 'react';

// useForm return interface
export interface UseFormRetInterface<UseFormEntity> {
	handleChange: (event: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	values: UseFormEntity;
	errors: UseFormEntity;
	loader: boolean;
}
