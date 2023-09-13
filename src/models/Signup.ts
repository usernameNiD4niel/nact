import { ZodType, z } from "zod";
import {
	AccountDetailDatatypes,
	PersonalDetailDatatypes,
	User,
} from "../constants/props";

const requiredErrorMessage = (field: string): string => {
	return `${field} is required and cannot be empty`;
};

const invalidTypeErrorMessage = (field: string): string => {
	return `Please enter a valid ${field}`;
};

const gender = ["Male", "Female"] as const;

export const PersonalDetailSchema: ZodType<PersonalDetailDatatypes> = z.object({
	firstName: z
		.string({
			required_error: requiredErrorMessage("First name"),
			invalid_type_error: invalidTypeErrorMessage("First name"),
		})
		.trim()
		.min(3, { message: "First Name must be at least 3 characters long" })
		.max(20, { message: "First Name must not be exceed 20 characters long" }),
	lastName: z
		.string({
			required_error: requiredErrorMessage("Last name"),
			invalid_type_error: invalidTypeErrorMessage("Last name"),
		})
		.trim()
		.min(3, { message: "Last Name must be at least 3 characters long" })
		.max(20, { message: "First Name must not be exceed 20 characters long" }),
	middleInitial: z
		.string({
			required_error: requiredErrorMessage("Middle Name"),
			invalid_type_error: invalidTypeErrorMessage("Middle Name"),
		})
		.trim()
		.length(1, {
			message: "Middle Initial must be 1 character",
		}),
});

export const AccountDetailSchema: ZodType<AccountDetailDatatypes> = z
	.object({
		mobileNumber: z
			.string({
				required_error: requiredErrorMessage("Mobile Number"),
				invalid_type_error: invalidTypeErrorMessage("Mobile Number"),
			})
			.trim()
			.length(11, { message: "Phone number must be 11 digit numbers long" })
			.startsWith("09", { message: "Phone number must start with 09" }),
		pin: z
			.string({
				required_error: requiredErrorMessage("Pin Code"),
				invalid_type_error: invalidTypeErrorMessage("Pin Code"),
			})
			.refine((value) => /^\d+$/.test(value), {
				message: "Only numbers are allowed",
			}),
		confirmPin: z.string({
			required_error: requiredErrorMessage("Confirm Pin Code"),
			invalid_type_error: invalidTypeErrorMessage("Confirm Pin Code"),
		}),
	})
	.refine((data) => data.pin === data.confirmPin, {
		message: "Confirm pin does not match to pin",
		path: ["confirmPin"],
	});

export const SignupValidationSchema: ZodType<User> = z
	.object({
		firstName: z
			.string({
				required_error: requiredErrorMessage("First name"),
				invalid_type_error: invalidTypeErrorMessage("First name"),
			})
			.trim()
			.min(3, { message: "First Name must be at least 3 characters long" })
			.max(20, { message: "First Name must not be exceed 20 characters long" }),
		lastName: z
			.string({
				required_error: requiredErrorMessage("Last name"),
				invalid_type_error: invalidTypeErrorMessage("Last name"),
			})
			.trim()
			.min(3, { message: "Last Name must be at least 3 characters long" })
			.max(20, { message: "Last Name must not be exceed 20 characters long" }),
		middleName: z
			.string({
				required_error: requiredErrorMessage("Middle Name"),
				invalid_type_error: invalidTypeErrorMessage("Middle Name"),
			})
			.trim()
			.min(1, { message: "Middle Initial must be atleast 1 character long" })
			.max(1, {
				message: "Middle Initial cannot be more than 1 character long",
			}),
		birthDate: z
			.string({
				required_error: requiredErrorMessage("Birth date"),
				invalid_type_error: invalidTypeErrorMessage("Birth date"),
			})
			.trim()
			.min(10, { message: "Please enter a valid birth date" }),
		gender: z
			.enum(gender)
			.refine((data) => data.includes("Male") || data.includes("Female")),
		mobileNumber: z
			.string({
				required_error: requiredErrorMessage("Mobile Number"),
				invalid_type_error: invalidTypeErrorMessage("Mobile Number"),
			})
			.trim()
			.length(11, { message: "Phone number must be 11 digit numbers long" })
			.startsWith("09", { message: "Phone number must start with 09" }),
		pin: z
			.string({
				required_error: requiredErrorMessage("Pin Code"),
				invalid_type_error: invalidTypeErrorMessage("Pin Code"),
			})
			.length(4, { message: "Pin code must be 4 digit numbers long" }),
		confirmPin: z.string({
			required_error: requiredErrorMessage("Confirm Pin Code"),
			invalid_type_error: invalidTypeErrorMessage("Confirm Pin Code"),
		}),
	})
	.refine((data) => data.pin !== data.confirmPin, {
		message: "Pin code is not equal to confirm pin",
		path: ["confirmPinCode"],
	});
