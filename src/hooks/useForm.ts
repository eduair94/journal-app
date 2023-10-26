import { useEffect, useMemo, useState } from 'react';

export interface FormValues {
    [key: string]: string;
}

export interface FormValidationsI {
    [key:string]: [(value:string) => boolean, string];
}

type useFormI = {
    formState: FormValues;
    onInputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
    isFormValid: boolean;
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
} & FormValues;

export const useForm = (initialForm: FormValues = {}, formValidations: FormValidationsI = {}): useFormI => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const createValidators = () => {
            const formCheckedValues: {
                [key: string]: string | null;
            } = {};
            for(const formField in formValidations) {
                const [fn, errorMessage] = formValidations[formField];
                formCheckedValues[`${formField}Valid`] = !formSubmitted || fn(formState[formField] as string) ? null : errorMessage;
            }
            setFormValidation(formCheckedValues);
        }
        createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState, formSubmitted])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const isFormValid = useMemo(() => {
        return Object.values(formValidation).every((value) => value === null);
    }, [formValidation])
    

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        console.log("input change", name, value);
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
        setFormSubmitted
    } as useFormI
}