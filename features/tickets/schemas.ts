import { z } from "zod";
import { TICKET_PRIORITIES } from "@/constants/ticket";
import { formatFileSize } from "@/utils/format-file-size";
import {
  ATTACHMENT_ACCEPTED_TYPES,
  ATTACHMENT_MAX_FILES,
  ATTACHMENT_MAX_SIZE_BYTES,
} from "./constants";


const acceptedTypes: readonly string[] = ATTACHMENT_ACCEPTED_TYPES;

const attachments = z
  .array(z.instanceof(File))
  .max(ATTACHMENT_MAX_FILES, `You can attach up to ${ATTACHMENT_MAX_FILES} files`)
  .refine(
    (files) => files.every((file) => file.size <= ATTACHMENT_MAX_SIZE_BYTES),
    `Each file must be ${formatFileSize(ATTACHMENT_MAX_SIZE_BYTES)} or smaller`,
  )
  .refine(
    (files) => files.every((file) => acceptedTypes.includes(file.type)),
    "Only JPG, PNG and WebP images and PDF files are allowed",
  );

export const createTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(255, "Subject must be 255 characters or fewer"),
  description: z.string().trim().min(10, "Please describe the problem in at least 10 characters"),
  priority: z.enum(TICKET_PRIORITIES),
  attachments,
});

export const replySchema = z.object({
  body: z.string().trim().min(1, "Reply cannot be empty"),
});