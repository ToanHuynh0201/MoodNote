import type { z } from "zod";

/**
 * Map of field names to their current error messages.
 * undefined means the field has no error.
 */
export type FormErrors<V extends Record<string, string>> = {
	[K in keyof V]?: string;
};

/** Zod schema type used by useForm. */
export type ZodSchema = z.ZodTypeAny;
