// Fired from the hero resume button; the resume viewer (in the About section)
// listens and opens its redacted in-app viewer. Kept in a shared module so the
// two sections agree on the name without importing across each other.
export const OPEN_RESUME_VIEWER_EVENT = "open-resume-viewer";
