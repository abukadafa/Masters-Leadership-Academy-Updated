import React from "react";

/**
 * Hidden anti-spam field for public forms. Real visitors never see or fill this in;
 * automated form-fillers often complete every field they find, so a non-empty value here
 * is a strong signal the submission is a bot. Paired with the `isHoneypotFilled` check in
 * lib/validate.ts, which the matching API route uses to silently discard the submission.
 *
 * Positioned off-screen (not `display: none`) and marked `aria-hidden` + `tabIndex={-1}`
 * so it's invisible to sighted users and skipped by screen readers and keyboard navigation,
 * while still being present in the DOM for naive bots to fill in.
 */
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
    >
      <label htmlFor="website">Leave this field blank</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
