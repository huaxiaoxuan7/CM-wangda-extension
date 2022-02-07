### 使用前必读
1. 本扩展仅供学习交流于学习前端技术使⽤。

2. 使用本扩展代表**自愿接受**使用增强带来的所有后果，如不愿接受请[卸载](https://support.microsoft.com/zh-cn/microsoft-edge/%E5%9C%A8%E6%89%A9%E5%B1%95%E4%B8%AD%E6%B7%BB%E5%8A%A0-%E5%85%B3%E9%97%AD%E6%88%96%E5%88%A0%E9%99%A4microsoft-edge-9c0ec68c-2fbc-2f2c-9ff0-bdc76f46b026)本扩展。

3. 本扩展不收集任何账号、密码等个人信息。


### Overall
>Microsoft Edge 扩展 是开发人员用于添加或修改 Microsoft Edge 功能的小程序。扩展可改善用户的浏览体验。它通常提供对目标受众很重要的基函数。

1. **网大功能增强**是一个[Microsoft Edge 扩展](https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/)，采用现代前端框架开发，只作用于[中移网大](https://wangda.chinamobile.com/)相关页面。增强功能均通过[DOM API](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)实现。所有功能均可**通过配置页面关闭**。

2. 利用[Microsoft Edge 扩展](https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/)的特性，降低了扩展安装和卸载的学习成本，利用Edge浏览器账号机制实现了同一账号的**插件同步**和**设置同步**。

3. 本扩展代码**开源**，使用过程中有问题请[提Issue](https://github.com/huaxiaoxuan7/CM-wangda-extension/issues)。

4. 如以前安装过功能类似的脚本，使用本扩展前需**卸载**之前的脚本，否则将**出现无法预料的结果**。
 
### 主要功能介绍

##### 1. 选项页面
- **通过配置页面配置功能**

![](/assets/settings.gif "通过配置页面配置增强功能")
##### 2. 浮窗
- **首页内浮窗(默认开启)**

  自动记录最近打开的**专题页面**列表，提供专题快速进入按钮。可以删除不需要的专题。

![](/assets/homePanel.gif "首页内浮窗")

- **专题内浮窗(默认开启)**

  自动搜索当前**专题**页面下的**课程**列表，提供课程快速进入按钮。课程类型、完成情况或是否选修等信息均有显示。

![](/assets/subjectPanel.gif "专题内浮窗")


- **课程内浮窗(默认开启)**

  记录当前**课程**的学习时间以及各种课程的完成次数。

![](/assets/coursePanel.gif "课程内浮窗")

##### 3. 学习增强
- **音/视频自动恢复播放(默认开启)**

- **文档/图片自动学习(默认开启)**

- **已学习课程自动跳过(默认开启)**

- **课程页面学习结束后自动关闭（默认关闭）**

- **音视频自动静音(默认开启)**

#### 原有脚本卸载（如Edge浏览器上未安装过则忽略）
- **直接卸载插件**

![](/assets/uninstallCrx.gif "直接卸载插件")

- **删除之前脚本**

![](/assets/uninstallScript.gif "直接卸载插件")
