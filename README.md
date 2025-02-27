# SDK TypeScript 文档

本文档介绍了 `@cuteid.ai/sdk` 的使用方法和实现细节。该 SDK 主要用于初始化应用，在 API 请求成功后，根据不同的环境自动跳转到对应的页面。

---

## 功能概述

SDK 提供了一个 `init` 方法，该方法接受三个参数：

- **appUuid**: 应用 ID（字符串），必传。
- **callbackUrl**: 回调 URL，当 API 请求成功后浏览器将跳转到此页面（字符串），必传。
- **env**: 环境参数，允许值为 `STAG` 或 `PROD`（字符串），默认为 `PROD`。  
  - 当传入 `STAG` 时，使用测试环境的前端页面地址。
  - 当传入 `PROD` 时，使用生产环境的前端页面地址。

---

# 安装指南

本文档介绍如何安装 `@cuteid.ai/sdk`，该包托管在 GitHub Packages 上，即使是公开包也需要进行认证配置。

## 安装步骤

### 使用 npm 安装

在终端中运行以下命令：
```bash
npm install @cuteid.ai/sdk
```

### 使用 yarn 安装

在终端中运行以下命令：
```bash
yarn add @cuteid.ai/sdk
```

# 使用方法

## 1. 引入 SDK

在你的项目文件中导入 SDK 的 `init` 方法。例如：

```typescript
import { init } from '@cuteid.ai/sdk';
```

## 2. 调用 init 方法
#### init 方法接受三个参数：

- appUuid：应用的唯一标识符（字符串，必传）。
- callbackUrl：请求成功后要跳转的 URL（字符串，必传）。
- env：环境参数，允许的值为 STAG 或 PROD（可选，默认为 PROD）。

```
init('your-app-uuid', 'https://your-callback-url.com', 'STAG')
  .catch(error => console.error('初始化SDK失败:', error));
```
