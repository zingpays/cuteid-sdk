// sdk.ts

/**
 * 配置接口
 */
export interface Config {
  /**
   * 请求成功后跳转的回调 URL（可选）
   */
  callbackUrl?: string;
  /**
   * 环境参数，允许的值为 'STAG' 或 'PROD'（默认为 'PROD'）
   */
  env?: 'STAG' | 'PROD';
}

/**
 * 存储 init 请求返回的 query 字符串
 */
let storedQueryStr: string | null = null;
/**
 * 存储根据环境确定的 Web Base URL，用于跳转时使用
 */
let storedWebBaseUrl: string | null = null;

/**
 * 存储根据环境确定的 API Base URL，用于请求时使用
 */
let apiBaseUrl: string | null = null;

/**
 * 初始化 SDK
 *
 * @param app_uuid - 应用 ID（必传）
 * @param config - 配置对象（可选），包含 callbackUrl 和 env
 *
 * 如果传入了 callbackUrl，会附加到 API 请求中。env 参数用来确定跳转使用的 Web 地址，
 * 默认为 'PROD'（生产环境），也可以指定为 'STAG'（测试环境）。
 *
 * 请求成功后，内部会保存返回的 query 字符串，用于后续调用 jump() 方法进行跳转。
 */
export const init = async (
  app_uuid: string,
  config?: Config
): Promise<void> => {
  if (!app_uuid) {
    throw new Error('参数错误：app_uuid 为必传参数');
  }

  // 提取配置参数，设置默认值：默认环境为 'PROD'
  const callbackUrl = config?.callbackUrl || '';
  const env: 'STAG' | 'PROD' = config?.env || 'PROD';

  if (env === 'STAG') {
    storedWebBaseUrl = 'https://sandbox-web.cuteid.ai';
    apiBaseUrl = 'https://sandbox-api.cuteid.ai';
  } else if (env === 'PROD') {
    storedWebBaseUrl = 'https://web.cuteid.ai';
    apiBaseUrl = 'https://api.cuteid.ai';
  } else {
    new Error("环境参数错误：env 允许的值为 'STAG' 或 'PROD'");
  }
  
  // 构造请求 URL，callbackUrl 为可选参数
  const url = `${apiBaseUrl}/api/partner/simulate-partner-request?app_uuid=${app_uuid}${
    callbackUrl ? `&callback_url=${encodeURIComponent(callbackUrl)}` : ''
  }`;

  // 发起 API 请求
  const response = await fetch(url);
  const res = await response.json();

  if (res && res.code === 0 && res.data && res.data.query_str) {
    storedQueryStr = res.data.query_str;
  } else {
    throw new Error('API 请求失败或返回错误');
  }
};

/**
 * 跳转方法
 *
 * 调用 jump() 方法会使用 init() 方法请求获得的数据拼接跳转 URL，
 * 并将浏览器跳转到对应页面。必须先调用 init() 方法并成功获取数据后，才能调用 jump()。
 */
export const jump = (): void => {
  if (!storedQueryStr || !storedWebBaseUrl) {
    throw new Error('未获取到跳转地址，请先调用 init() 并确保其成功执行');
  }
  window.location.href = `${storedWebBaseUrl}/?${storedQueryStr}`;
};

const cuteid = {
  init,
  jump
};

export default cuteid;
