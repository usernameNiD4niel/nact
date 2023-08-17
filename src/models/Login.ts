import { ZodType, z } from "zod";

export type LoginProps = {
  phoneNumber: string;
  pin: string;
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
  pin: z.string().regex(/^\d+$/, "Only numbers are allowed"),
});
