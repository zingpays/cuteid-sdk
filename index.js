// sdk.js
/**
 * 初始化SDK
 * @param {string} appUuid - 应用ID
 * @param {string} callbackUrl - 回调URL（请求成功后跳转的页面）
 */
export const init = async (appUuid, callbackUrl) => {
  // 参数校验
  if (!appUuid || !callbackUrl) {
    throw new Error('参数错误：appid和callbackurl均为必传参数');
  }

  const response = await fetch(`https://cuteid-api.zdev1.com/api/partner/simulate-partner-request?app_uuid=${appUuid}&callback_url=${callbackUrl}`)
  const res = await response.json()
  if (res && res.code == 0) {
    const query_str = res.data.query_str
    window.location.href = `https://cuteid-web-dev.zdev1.com/?${query_str}`
  }
}
