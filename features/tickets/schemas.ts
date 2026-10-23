import { z } from "zod";
import { TICKET_PRIORITIES } from "@/constants/ticket";

export const createTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(255, "Subject must be 255 characters or fewer"),
  description: z.string().trim().min(10, "Please describe the problem in at least 10 characters"),
  priority: z.enum(TICKET_PRIORITIES),
});