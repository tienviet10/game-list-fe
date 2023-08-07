import { notification } from 'antd';
import '@/styles/global.scss';

const useNotification = (noteType = 'default' as string) => {
  const [messageApi, contextHolder] = notification.useNotification();

  const info = (value: string) => {
    messageApi.info({
      type: 'info',
      key: `${noteType}-info`,
      message: value,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
    });
  };

  const success = (value: string) => {
    messageApi.success({
      key: `${noteType}-success`,
      message: value,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
    });
  };

  const warning = (value: string) => {
    messageApi.warning({
      message: value,
      key: `${noteType}-warning`,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
    });
  };

  return {
    warning,
    success,
    contextHolder,
    info,
  };
};

export default useNotification;
