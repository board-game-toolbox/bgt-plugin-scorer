import { atom, getDefaultStore } from 'jotai';

export const j_dialog_show = atom(false);
export const j_dialog_cancelable = atom(false);
export const j_dialog_content = atom<React.JSX.Element | null>(null);

export function showDialog(
  content: React.JSX.Element,
  cancelable: boolean = true,
) {
  const store = getDefaultStore();
  store.set(j_dialog_content, content);
  store.set(j_dialog_cancelable, cancelable);
  store.set(j_dialog_show, true);
}
