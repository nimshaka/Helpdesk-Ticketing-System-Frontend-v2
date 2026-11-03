import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, unwrap } from "@/lib/api/action-result";
import { getAttachmentLinkAction } from "../api";

type OpenMode = "view" | "download";

export function useOpenAttachment(ticketId: number, attachmentId: number) {
  const mutation = useMutation({
    mutationFn: async (mode: OpenMode) =>
      unwrap(await getAttachmentLinkAction(ticketId, attachmentId, mode === "download")),
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  function open(mode: OpenMode) {
    // Open the tab now, while the click still counts as a user action:
    // browsers block pop-ups that are opened after an `await`.
    const tab = mode === "view" ? window.open("", "_blank") : null;
    if (tab) tab.opener = null; // the new tab must not be able to reach this page

    mutation.mutate(mode, {
      onSuccess: ({ data }) => {
        if (mode === "view" && tab) {
          tab.location.href = data.url;
          return;
        }
        // Download, or a blocked pop-up: the link itself says "save" or "show".
        window.location.assign(data.url);
      },
      onError: () => tab?.close(),
    });
  }

  return { open, isPending: mutation.isPending, mode: mutation.variables };
}