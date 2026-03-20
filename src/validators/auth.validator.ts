import z from "zod";

const signupAndLoginValidator = z.object({
  fullname: z.string().min(3).max(50),
  email: z.string().email(),
  image: z.string(),
});

export default signupAndLoginValidator;
