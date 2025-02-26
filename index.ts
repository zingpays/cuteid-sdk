// sdk.ts
/**
 * 初始化SDK
 * @param appUuid - 应用ID
 * @param callbackUrl - 回调URL（请求成功后跳转的页面）
 * @param env - 环境参数，允许值为 'STAG' 或 'PROD'（默认为 'STAG'）
 */
export const init = async (
  appUuid: string,
  callbackUrl: string,
  env: 'STAG' | 'PROD' = 'PROD'
): Promise<void> => {
  let webBaseUrl: string;
  let apiBaseUrl: string;
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!appUuid || !callbackUrl) {
      reject(new Error('参数错误：appUuid 和 callbackUrl 均为必传参数'));
    }
    if (env === 'STAG') {
      webBaseUrl = 'https://sandbox-web.cuteid.ai';
      apiBaseUrl = 'https://sandbox-api.cuteid.ai';
    } else if (env === 'PROD') {
      webBaseUrl = 'https://web.cuteid.ai';
      apiBaseUrl = 'https://api.cuteid.ai';
    } else {
      reject(new Error("环境参数错误：env 允许的值为 'STAG' 或 'PROD'"));
    }

    // 发起 API 请求
    fetch(
      `${apiBaseUrl}/api/partner/simulate-partner-request?app_uuid=${encodeURIComponent(appUuid)}&callback_url=${encodeURIComponent(callbackUrl)}`
    )
      .then((response) => response.json())
      .then((res) => {
        // 若接口返回成功，跳转到对应页面
        if (res && res.code === 0) {
          const queryStr: string = res.data.query_str;
          window.location.href = `${webBaseUrl}/?${queryStr}`;
          resolve();
        }
      })
      .catch((error) => {
        reject(new Error('请求失败'));
      });
  });
};
