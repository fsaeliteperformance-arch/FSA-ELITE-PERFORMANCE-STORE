const roundedButtonBase = "rounded-full text-white";
const primaryButtonBase = `${roundedButtonBase} bg-brand`;

export const compactPrimaryButtonStyles = `${primaryButtonBase} p-2 transition-colors hover:bg-brand-accent`;
export const primaryButtonStyles = `${primaryButtonBase} w-full px-6 py-3 font-bold transition-colors hover:bg-brand-accent disabled:opacity-50`;
export const primaryCtaLinkStyles = `${primaryButtonBase} inline-block px-8 py-3 font-semibold transition-opacity hover:opacity-90`;
export const accentButtonStyles = `${roundedButtonBase} w-full bg-brand-accent py-3 font-bold transition-opacity hover:opacity-90 disabled:opacity-50`;
