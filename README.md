# @cuteid.ai/sdk 使用说明

本 SDK 提供两个方法：`init` 和 `jump`。下面介绍每个方法的用途、所需参数以及使用示例。

---

## 1. init 方法

**用途**  
`init` 用于初始化 SDK。它会发起 API 请求，根据传入的参数和 API 返回的结果保存必要的信息，以便后续页面跳转使用。

**参数**

- **app_uuid** (`string`)  
  必传参数，表示应用的唯一标识符。

- **config** (可选，对象类型 `Config`)  
  包含以下可选属性：
  - **callbackUrl** (`string`)  
    请求成功后用于构造跳转 URL 的回调地址。
  - **env** (`'STAG' | 'PROD'`)  
    指定环境参数，决定使用哪一个 Web Base URL 进行跳转。  
    - 传入 `'STAG'` 时，使用测试环境地址。  
    - 传入 `'PROD'` 或不传时，默认使用生产环境地址。

**返回值**  
返回一个 `Promise<void>`，成功时会保存 API 返回的查询字符串，用于后续跳转。

**示例**
```typescript
import { init } from '@cuteid.ai/sdk';

// 初始化 SDK，使用测试环境并传入可选的 callbackUrl
init('your-app-uuid', {
  callbackUrl: 'https://your-callback-url.com',
  env: 'STAG'
})
  .then(() => {
    console.log('初始化成功');
  })
  .catch(error => {
    console.error('初始化失败:', error);
  });
```

## 1. jump 方法

**用途**  
`jump` 方法会利用 `init` 方法中获取的 API 返回数据拼接出一个完整的跳转 URL，然后将浏览器重定向到该地址。

**参数**
无参数。

**返回值**  
无返回值。该方法直接修改 window.location.href 来实现页面跳转。

**使用前提**  
必须先调用 `init` 方法并确保其成功执行，否则缺少必要数据时调用 `jump` 将抛出错误。

**示例**
```typescript
import { jump } from '@cuteid.ai/sdk';

try {
  jump();
} catch (error) {
  console.error('跳转失败:', error);
}
```

## 总结

1. **初始化 SDK**  
   - 调用 `init` 方法时，必须传入必需的 `app_uuid`。  
   - 可选的配置对象 `config` 可以包含：  
     - `callbackUrl`：用于构造跳转 URL 的回调地址。  
     - `env`：环境参数，可传 `'STAG'`（测试环境）或 `'PROD'`（生产环境，默认值）。
   - `init` 方法会发起 API 请求，并将返回的查询字符串保存，用于后续跳转。

2. **页面跳转**  
   - 调用 `jump` 方法会根据 `init` 方法中获取的数据拼接跳转 URL。  
   - `jump` 方法直接修改 `window.location.href` 实现页面重定向。  
   - 必须确保先成功调用 `init` 方法，否则调用 `jump` 时将因缺少必要数据而抛出错误。

