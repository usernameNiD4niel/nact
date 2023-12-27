import { ZodType, z } from "zod";

export type LoginProps = {
	phoneNumber: string;
};

export type Login = {
	phoneNumber: string;
	one: string;
	two: string;
	three: string;
	four: string;
};

const requiredErrorMessage = (field: string): string => {
	return `${field} is required and cannot be empty`;
};

const invalidTypeErrorMessage = (field: string): string => {
	return `Please enter a valid ${field}`;
};

export const LoginSchema: ZodType<LoginProps> = z.object({
	phoneNumber: z
		.string({
			required_error: requiredErrorMessage("Mobile Number"),
			invalid_type_error: invalidTypeErrorMessage("Mobile Number"),
		})
		.trim()
		.length(11, { message: "Phone number must be 11 digit numbers long" })
		.startsWith("09", { message: "Phone number must start with 09" }),
});

const fieldSchema = z
	.string()
	.length(1)
	.regex(/^\d$/, "Only numbers are allowed");

export const formSchema = z.object({
	field1: fieldSchema,
	field2: fieldSchema,
	field3: fieldSchema,
	field4: fieldSchema,
	phoneNumber: z
		.string()
		.length(11, { message: "Phone number must be 11 digit numbers" })
		.startsWith("09", { message: "Phonee number must start with 09" }),
});
