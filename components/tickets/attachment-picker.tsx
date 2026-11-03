"use client";

import { FileText, ImageIcon, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { Field } from "@/components/shared/field";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/format-file-size";
import {
  ATTACHMENT_ACCEPT_ATTRIBUTE,
  ATTACHMENT_MAX_FILES,
  ATTACHMENT_MAX_SIZE_BYTES,
} from "@/features/tickets/constants";
import { fileKey, mergeFiles } from "@/features/tickets/utils";

type AttachmentPickerProps = {
  id: string;
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  error?: string;
};

export function AttachmentPicker({ id, files, onChange, disabled = false, error }: AttachmentPickerProps) {
  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    onChange(mergeFiles(files, Array.from(event.target.files ?? [])));
    event.target.value = ""; // lets the same file be chosen again after it was removed
  }

  return (
    <Field id={id} label="Attachments (optional)" error={error}>
      <div className="space-y-3">
        <input
          id={id}
          type="file"
          multiple
          accept={ATTACHMENT_ACCEPT_ATTRIBUTE}
          disabled={disabled}
          onChange={handleSelect}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-input file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-accent"
        />
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          Up to {ATTACHMENT_MAX_FILES} files, {formatFileSize(ATTACHMENT_MAX_SIZE_BYTES)} each. JPG, PNG,
          WebP or PDF.
        </p>

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file) => {
              const Icon = file.type === "application/pdf" ? FileText : ImageIcon;

              return (
                <li key={fileKey(file)} className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm">
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${file.name}`}
                    disabled={disabled}
                    onClick={() => onChange(files.filter((item) => item !== file))}
                  >
                    <X />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Field>
  );
}