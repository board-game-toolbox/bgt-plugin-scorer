import { useAtomValue } from 'jotai';
import './Export.css';
import { j_export_status, j_export_url } from '../modules/export';

function Export() {
  const status = useAtomValue(j_export_status);
  const url = useAtomValue(j_export_url);

  return (
    <div className="export">
      {status === 'loading' ? (
        <>
          <div className="lds-dual-ring"></div>
          <div className="export__text">导出中，请等待</div>
        </>
      ) : status === 'success' ? (
        <>
          <div>导出成功，复制到浏览器下载</div>
          <div className="export__url">{url || '链接失踪啦 :('}</div>
        </>
      ) : (
        <>
          <div>导出失败，请退出重试</div>
        </>
      )}
    </div>
  );
}

export default Export;
