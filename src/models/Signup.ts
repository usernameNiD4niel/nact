import { z } from "zod";

export default SignupValidationSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(3, { message: "First Name must be at least 3 characters long" }),
	lastName: z
		.string()
		.trim()
		.toLowerCase()
		.min(3, { message: "Last Name must be at least 3 characters long" }),
});
