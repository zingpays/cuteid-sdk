# @cuteid.ai/sdk 使用说明

本 SDK 通过默认导出一个对象 `cuteid` 来提供两种主要方法：`init` 和 `jump`。

## 方法概述

- **cuteid.init(app_uuid, config?)**
  - **用途**：初始化 SDK，发起 API 请求，并保存返回的查询字符串以便后续跳转。
  - **参数**：
    - `app_uuid` (string)：必传参数，表示应用的唯一标识符。
    - `config` (可选对象)：包含以下属性：
      - `callbackUrl` (string, 可选)：请求成功后用于跳转 URL 拼接的回调地址。
      - `env` (`'STAG'` | `'PROD'`, 可选)：环境参数。传入 `'STAG'` 使用测试环境，传入 `'PROD'` 使用生产环境。默认值为 `'PROD'`。
  - **返回值**：返回一个 `Promise<void>`，成功时内部保存 API 返回的数据，供 `jump()` 方法使用。

- **cuteid.jump()**
  - **用途**：基于 `init` 方法中获取的数据，拼接跳转 URL，并将浏览器重定向到该地址。
  - **参数**：无。调用该方法前必须确保已成功调用 `init()`。

## 安装

请确保你的项目已经配置好 `.npmrc` 文件（如果需要配置组织范围），然后使用 npm 或 Yarn 安装：

```bash
npm install @cuteid.ai/sdk
# 或者
yarn add @cuteid.ai/sdk
```

## 使用示例

在你的代码中引入 SDK 并调用其方法：

```
import cuteid from '@cuteid.ai/sdk';

(async () => {
  try {
    // 初始化 SDK，必须传入 app_uuid，config 对象中可设置 callbackUrl 和 env（默认为 'PROD'）
    await cuteid.init('your-app-uuid', {
      callbackUrl: 'https://your-callback-url.com', // 可选参数
      env: 'STAG' // 若需要测试环境，请传入 'STAG'；默认为 'PROD'
    });
    console.log('SDK 初始化成功');

    // 初始化成功后，调用 jump() 进行页面跳转
    cuteid.jump();
  } catch (error) {
    console.error('SDK 初始化失败:', error);
  }
})();
```

## 注意事项
- 调用顺序：在调用 `cuteid.jump()` 前，必须先成功调用 `cuteid.init()`，因为跳转 URL 依赖于 `init` 方法中获取的数据。
- 环境参数：如果不传递 `env`，默认将使用生产环境（`'PROD'`）；若需要在测试环境中运行，请传入 `env: 'STAG'`。
- 错误处理：请为 `init` 和 `jump` 方法添加适当的错误处理，以确保在 API 请求失败或数据未正确返回时能够捕获并处理错误。