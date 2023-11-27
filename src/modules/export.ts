import html2canvas from 'html2canvas';
import { atom, getDefaultStore } from 'jotai';
import { j_dialog_cancelable } from './dialog';

export const j_export_status = atom<'loading' | 'fail' | 'success'>('loading');
export const j_export_url = atom('');

export function exportPNG() {
  try {
    const el = document.getElementById('scorer');
    if (el) {
      html2canvas(el)
        .then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) throw new Error('blob is null');

            const formData = new FormData();
            formData.append('file', blob, '');

            // upload to file service
            return fetch('https://imgbed.link/imgbed/file/upload', {
              method: 'POST',
              body: formData,
            })
              .then((res) => res.json())
              .then(
                (data: {
                  code: number;
                  msg: string;
                  rows: { url: string }[];
                }) => {
                  const store = getDefaultStore();
                  store.set(j_export_url, data.rows[0].url);
                  store.set(j_export_status, 'success');
                  store.set(j_dialog_cancelable, true);
                },
              );
          });
        })
        .catch((e) => {
          window.bgt?.toast('导出失败');
          throw new Error(e);
        });
    } else {
      window.bgt?.toast('插件异常，请重新加载');
      throw new Error('el is null');
    }
  } catch (e) {
    console.error(e);

    const store = getDefaultStore();
    store.set(j_export_status, 'fail');
    store.set(j_dialog_cancelable, true);
  }
}
