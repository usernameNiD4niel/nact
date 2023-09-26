import z from "zod";

// Define the validation schema
export const supplierValidationSchema = z.object({
	businessName: z
		.string({ required_error: "Business name is required" })
		.min(1, "Business name is required"),
	city: z.string().min(1, "A valid city should have atleast 3 characters long"),
	// state: z.string().min(3, "Enter a valid state"),
	// country: z.string().min(3, "Enter a valid country"),
	companyPhoneNumber: z
		.string()
		.min(11, "Please enter a valid phone number")
		.max(13, "Phone number cannot be more than 13 characters long"),
	companyEmailWebsite: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is a required field"),
	email: z
		.string()
		.email("Email should be a valid email address")
		.min(1, "Email is required field"),
});
