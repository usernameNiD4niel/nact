import { formSchema } from "@/models/Login";
import { z } from "zod";

export const validateForm = (data: FormData): string | null => {
	try {
		formSchema.parse(data);
		return null; // returns null if no error
	} catch (e) {
		if (e instanceof z.ZodError) {
			// Calculate the number of invalid fields
			const invalidFields = e.errors
				.map((error) => error.path)
				.filter(Boolean).length;
			return `All fields are required and must be a single digit. ${invalidFields} out of 4 fields are missing or invalid.`;
		}
		return "An unexpected error occurred";
	}
};
