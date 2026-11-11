"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = { isOpen: boolean; open: () => void; close: () => void; toggle: () => void };

const WhatsAppContext = createContext<Ctx | null>(null);

/** Estado único do seletor de unidades — usado pelo botão flutuante e pelo header. */
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsApp precisa estar dentro de <WhatsAppProvider>");
  return ctx;
}
