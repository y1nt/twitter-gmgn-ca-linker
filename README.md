# Twitter GMGN Quick Trade

A Chrome/Edge extension that detects EVM contract addresses on X/Twitter and turns them into clickable GMGN links.

## Installation

1. Open the Chrome/Edge extensions page: `chrome://extensions`
2. Enable `Developer mode` in the top-right corner.
3. Click `Load unpacked`.
4. Select the unzipped project folder.

## Usage

1. Open any X/Twitter timeline or tweet detail page.
2. When the page contains an EVM contract address in the format `0x` + 40 hexadecimal characters, the address will be converted into a green clickable link.
3. By default, the link opens:
   `https://gmgn.ai/bsc/token/contract-address`
4. Click the extension icon to switch the GMGN chain between BSC, Ethereum, and Base.

## Notes

* This extension currently only matches EVM contract addresses in the format `0x` + 40 hexadecimal characters.
* The default chain is BSC because GMGN URLs require a chain name. If the token in the tweet is not on BSC, switch the chain in the extension popup.
* After modifying the extension code, click the refresh button on the extensions page, then refresh the X/Twitter page.

# Twitter GMGN Quick Trade

在 X/Twitter 页面识别 EVM 合约地址，并把地址本身变成 GMGN 可点击链接。

## 安装

1. 打开 Chrome/Edge 的扩展管理页：`chrome://extensions`
2. 打开右上角 `开发者模式`
3. 选择 `加载已解压的扩展程序`
4. 选择文件目录

## 使用

1. 打开任意 X/Twitter 时间线或推文详情页
2. 文本中出现 `0x` + 40 位十六进制字符时，地址会变成绿色可点击链接
3. 默认打开：`https://gmgn.ai/bsc/token/合约地址`
4. 点扩展图标可切换 GMGN 链：BSC、Ethereum、Base

## 说明

- 当前只匹配 EVM 地址格式：`0x` + 40 位十六进制字符。
- 默认链是 BSC，因为 GMGN URL 需要链名；如果推文里的币不是 BSC，需要在扩展弹窗里切换链。
- 修改插件代码后，需要在扩展管理页点击刷新按钮，再刷新 X/Twitter 页面。
