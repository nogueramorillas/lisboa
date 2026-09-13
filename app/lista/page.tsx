"use client";

import { useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useTrip } from "@/lib/store";
import { Header } from "@/components/Header";
import type { PackingOwner } from "@/lib/types";

const PEOPLE: { id: PackingOwner; label: string; emoji: string }[] = [
  { id: "gisela", label: "Gisela", emoji: "🧳" },
  { id: "denis", label: "Denis", emoji: "🧳" },
];

export default function ListaPage() {
  const { packingItems, isPacked, togglePacking, addPackingItem, editPackingItem, removePackingItem, hydrated } =
    useTrip();
  const [person, setPerson] = useState<PackingOwner>("gisela");
  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const items = packingItems.filter((i) => i.owner === person);
  const total = items.length;
  const done = hydrated ? items.filter((i) => isPacked(i.id)).length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  function handleAdd() {
    if (!newItem.trim()) return;
    addPackingItem(newItem, person);
    setNewItem("");
  }

  function startEdit(id: string, currentName: string) {
    setEditingId(id);
    setEditValue(currentName);
  }

  function saveEdit() {
    if (!editingId) return;
    editPackingItem(editingId, editValue);
    setEditingId(null);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="🧳 Maleta" />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-3">
        <div>
          <h1 className="text-2xl font-extrabold">🧳 Maleta</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            Cada uno tiene su propia maleta — añade o edita lo que falte
          </p>
        </div>

        <div className="flex items-center gap-2">
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              onClick={() => setPerson(p.id)}
              className={`flex-1 rounded-2xl py-2 text-sm font-bold transition-all ${
                person === p.id
                  ? "bg-[var(--color-terracota)] text-white shadow-[var(--shadow-soft)]"
                  : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
              }`}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>
              {done} / {total} preparados
            </span>
            <span className="text-[var(--color-terracota)]">{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-cream-soft)]">
            <div
              className="h-full rounded-full bg-[var(--color-terracota)] transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="flex items-center gap-2"
        >
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Añadir algo a la maleta de ${person === "gisela" ? "Gisela" : "Denis"}…`}
            className="min-w-0 flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[15px] outline-none focus:border-[var(--color-terracota)]"
          />
          <button
            type="submit"
            aria-label="Añadir"
            disabled={!newItem.trim()}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-[var(--color-terracota)] text-white shadow-[var(--shadow-soft)] transition-transform active:scale-90 disabled:opacity-40"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </form>

        <div className="flex flex-col gap-2">
          {items.length === 0 && (
            <p className="rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-ink-soft)]">
              Aún no hay nada en la maleta de {person === "gisela" ? "Gisela" : "Denis"}. Añade el primer artículo
              arriba.
            </p>
          )}
          {items.map((item) => {
            const packed = hydrated && isPacked(item.id);
            const isEditing = editingId === item.id;

            if (isEditing) {
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-2xl border border-[var(--color-terracota)] bg-[var(--color-surface)] p-2.5 shadow-[var(--shadow-soft)]"
                >
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="min-w-0 flex-1 rounded-xl border border-[var(--color-border)] bg-transparent px-3 py-2 text-[15px] outline-none"
                  />
                  <button
                    onClick={saveEdit}
                    aria-label="Guardar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-terracota)] text-white"
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    aria-label="Cancelar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-soft)] text-[var(--color-ink-soft)]"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded-2xl border p-2.5 shadow-[var(--shadow-soft)] transition-all ${
                  packed
                    ? "border-transparent bg-[var(--color-terracota-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <button
                  onClick={() => togglePacking(item.id)}
                  className="flex flex-1 items-center gap-3 py-1 text-left active:scale-[0.98]"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      packed
                        ? "border-transparent bg-[var(--color-terracota)] text-white animate-pop"
                        : "border-[var(--color-border)] text-transparent"
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className={`text-[15px] font-medium ${packed ? "text-[var(--color-ink-soft)] line-through" : ""}`}>
                    {item.name}
                  </span>
                </button>
                <button
                  onClick={() => startEdit(item.id, item.name)}
                  aria-label="Editar"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] active:scale-90"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => removePackingItem(item.id)}
                  aria-label="Eliminar"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] active:scale-90"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
