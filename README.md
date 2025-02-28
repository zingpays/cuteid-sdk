# @cuteid.ai/sdk 使用说明

本 SDK 提供一个默认导出的对象 `cuteid`，其中包含两个方法：`init` 和 `jump`。

- **cuteid.init(config: Config): Promise<void>**  
  用于初始化 SDK，发起 API 请求，并保存返回的查询字符串，以便后续调用 `jump()` 方法进行页面跳转。

- **cuteid.jump(): void**  
  用于根据 `init` 方法获取的数据构造跳转 URL，并将浏览器重定向到该地址。请确保在调用 `jump` 前成功调用并完成 `init`。

---

## 请求说明

在CuteID标准方法中,测试环境的后端签名网址(https://your_domain.com/sign_api)

例如在测试环境中
```
curl -X GET "https://sandbox-api.cuteid.ai/api/partner/simulate-partner-request?app_uuid=eb4b0451-963f-44f0-afe2-2c4486d3dd6a&callback_url=https://xxx" \
     -H "Content-Type: application/json"
```


预期返回结果类似如下
```json
"data": {
  "query_str": "app_uuid=eb4b0451-963f-44f0-afe2-2c4486d3dd6a&external_id=XW8tXCsAEjXVjgbV&rand=979372&timestamp=1740583193&callback_url=https%3A%2F%2Fbaidu.com&sign=JqtsGCY73i8ey9SUZugLn1R7WmfwEKf2tyNf3HPA%2FJ4d3uFrtTACfgLRgHHbk3%2Brf4ccPN%2BNGu8VnGxSnisF2aC2hBDp5su%2BpuGd3TVeTTgR7etuERtprd3u%2BlBicAZzKI8nH5B%2BbdTqJLbRZYEDQyyHGaoTNOk4zMkyvdYYHYsSy793%2BB3AY7SYCX7VguTiXCbK3YwYiDB0%2FXH78TE6syAavLNTvKJJFlTWGH7z1BFc7aMrnDDsPMLWCQdw7Ne3HrR8pZbMbda%2FG6T0c7T%2Bd4shpgGR3VRfEdXusJ0Eo7xZeG12O67P85Vy%2Fft3tgYdmQK3ZSPCTfG%2FSC6hkgG%2BcQ%3D%3D",
}
```
---

## 参数说明

`init` 方法接收一个配置对象 `Config`，其参数详见下表：

| 参数名       | 类型     | 是否必传 | 默认值  | 描述                                               |
| ------------ | -------- | -------- | ------- | -------------------------------------------------- |
| `appUuid`    | string   | 是       | —       | 应用的唯一标识符                                   |
| `apiBaseUrl` | string   | 是       | —       | API 基础 URL，用于构造请求地址                     |
| `callbackUrl`| string   | 否       | '' | 请求成功后附加到 URL 上的回调地址                   |
| `env`        | 'STAG' \| 'PROD' | 否  | 'PROD'  | 环境参数：传入 `'STAG'` 使用测试环境；`'PROD'` 使用生产环境 |

---

## 使用示例

在你的项目中安装并使用 SDK：

1. **安装包**

使用 npm 或 yarn 安装包：
```bash
npm install @cuteid.ai/sdk
# 或者
yarn add @cuteid.ai/sdk
```

## 使用示例

在你的代码中引入 SDK 并调用其方法：

```javascript
import cuteid from '@cuteid.ai/sdk';

(async () => {
  try {
    // 初始化 SDK，必须传入 app_uuid，config 对象中可设置 callbackUrl 和 env（默认为 'PROD'）
    await cuteid.init({
      appUuid: 'your-app-uuid',
      // 签名接口地址
      apiBaseUrl: 'https://your_domain.com/sign_api',
      // 可选：传入回调地址
      callbackUrl: 'https://your-callback-url.com',
      // 可选：指定环境，默认为 'PROD'
      env: 'STAG'
    });
    console.log('SDK 初始化成功');

    // 初始化成功后，调用 jump() 进行页面跳转
    cuteid.jump();
  } catch (error) {
    console.error('SDK 初始化失败:', error);
  }
})();
```

如果签名接口不一致,则需要手动构建跳转链接
```javascript
const params = { // 来源于接口返回
  app_uuid: "eb4b0451-963f-44f0-afe2-2c4486d3dd6a",
  external_id: "XW8tXCsAEjXVjgbV", // 来源于接口返回
  rand: "979372",
  timestamp: "1740583193",
  callback_url: "https://baidu.com",
  sign: "JqtsGCY73i8ey9SUZugLn1R7WmfwEKf2tyNf3HPA/J4d3uFrtTACfgLRgHHbk3+r..." //来源于后端签名
};
const webBaseUrl = env === 'PROD' ? 'https://web.cuteid.ai' : 'https://sandbox-web.cuteid.ai'
window.location.href = `${webBaseUrl}/?${JSON.stringify(params)}`
```


## 注意事项
- 调用顺序：在调用 `cuteid.jump()` 前，必须先成功调用 `cuteid.init()`，因为跳转 URL 依赖于 `init` 方法中获取的数据。
- 环境参数：如果不传递 `env`，默认将使用生产环境（`'PROD'`）；若需要在测试环境中运行，请传入 `env: 'STAG'`。
- 错误处理：请为 `init` 和 `jump` 方法添加适当的错误处理，以确保在 API 请求失败或数据未正确返回时能够捕获并处理错误。


