import { useCallback, useState } from "react";
import type { FormErrors, FormValidators } from "@/types/form";

interface UseFormOptions<V extends Record<string, string>> {
	initialValues: V;
	validators?: FormValidators<V>;
}

const useForm = <V extends Record<string, string>>({
	initialValues,
	validators = {},
}: UseFormOptions<V>) => {
	const [values, setValues] = useState<V>(initialValues);
	const [errors, setErrors] = useState<FormErrors<V>>({});
	const [loading, setLoading] = useState(false);

	/** Update a single field value and clear its error if present. */
	const setFieldValue = useCallback(
		(field: keyof V, value: string) => {
			setValues((prev) => ({ ...prev, [field]: value }));
			setErrors((prev) =>
				prev[field] !== undefined
					? { ...prev, [field]: undefined }
					: prev,
			);
		},
		[],
	);

	/** Manually set an error on a single field (e.g. from an API response). */
	const setFieldError = useCallback((field: keyof V, message: string) => {
		setErrors((prev) => ({ ...prev, [field]: message }));
	}, []);

	/**
	 * Run all validators against current values.
	 * Sets errors state and returns true if the form is valid.
	 */
	const validate = useCallback((): boolean => {
		const newErrors: FormErrors<V> = {};

		for (const field of Object.keys(validators) as (keyof V)[]) {
			const rule = validators[field];
			if (rule) {
				const error = rule(values, values);
				if (error) {
					newErrors[field] = error;
				}
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [values, validators]);

	/** Reset values and errors back to initial state. */
	const reset = useCallback(() => {
		setValues(initialValues);
		setErrors({});
	}, [initialValues]);

	return {
		values,
		errors,
		loading,
		setLoading,
		setFieldValue,
		setFieldError,
		validate,
		reset,
	};
};

export default useForm;
