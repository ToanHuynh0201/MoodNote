/**
 * Validation rule for a single form field.
 * Returns an error message string if invalid, or undefined if valid.
 */
export type FieldValidator<V> = (value: V, values: V) => string | undefined;

/**
 * Map of field names to their validation rules.
 * Each key must match a key in the form values object.
 */
export type FormValidators<V extends Record<string, string>> = {
	[K in keyof V]?: FieldValidator<V>;
};

/**
 * Map of field names to their current error messages.
 * undefined means the field has no error.
 */
export type FormErrors<V extends Record<string, string>> = {
	[K in keyof V]?: string;
};
