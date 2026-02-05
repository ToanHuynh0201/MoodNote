import { z } from "zod";

/** Reusable email field: trim → required → email format check (short-circuits via pipe). */
const emailField = (requiredMsg: string, invalidMsg: string) =>
	z.string().trim().min(1, requiredMsg).pipe(z.email({ message: invalidMsg }));

/** Login password: required → min 6 (aborts after required so only one error shows). */
const passwordField = (requiredMsg: string, minMsg: string) =>
	z.string().superRefine((val, ctx) => {
		if (val.length === 0) {
			ctx.addIssue({ code: "custom", message: requiredMsg });
			return z.NEVER;
		}
		if (val.length < 6) {
			ctx.addIssue({ code: "custom", message: minMsg });
		}
	});

/** Register password: required → min 6 → uppercase → number → special char (aborts on first failure). */
const registerPasswordField = () =>
	z.string().superRefine((val, ctx) => {
		if (val.length === 0) {
			ctx.addIssue({ code: "custom", message: "Vui lòng nhập mật khẩu" });
			return z.NEVER;
		}
		if (val.length < 6) {
			ctx.addIssue({ code: "custom", message: "Mật khẩu phải có ít nhất 6 ký tự" });
			return z.NEVER;
		}
		if (!/[A-Z]/.test(val)) {
			ctx.addIssue({ code: "custom", message: "Mật khẩu phải có ít nhất 1 ký tự viết hoa" });
			return z.NEVER;
		}
		if (!/[0-9]/.test(val)) {
			ctx.addIssue({ code: "custom", message: "Mật khẩu phải có ít nhất 1 số" });
			return z.NEVER;
		}
		if (!/[^A-Za-z0-9]/.test(val)) {
			ctx.addIssue({ code: "custom", message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt" });
		}
	});

export const loginSchema = z.object({
	email: emailField("Vui lòng nhập email", "Email không hợp lệ"),
	password: passwordField(
		"Vui lòng nhập mật khẩu",
		"Mật khẩu phải có ít nhất 6 ký tự",
	),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, "Vui lòng nhập họ tên")
			.min(2, "Họ tên phải có ít nhất 2 ký tự"),
		email: emailField("Vui lòng nhập email", "Email không hợp lệ"),
		password: registerPasswordField(),
		confirmPassword: z
			.string()
			.min(1, "Vui lòng xác nhận mật khẩu"),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
				message: "Mật khẩu không khớp",
			});
		}
	});
