8novels-formatter
=================

日本語の小説向けの整形機能を提供する、Visual Studio Codeの機能拡張です。  

## Usage

コマンドパレットを開いて(<kbd><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></kbd>)「Format Novel」と入力するか、  
<kbd><kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>/</kbd></kbd>とショートカットを入力すると、下記のルールに基づき文書をフォーマットします。

(1) 行頭に全角スペースを挿入します。ただし、下記と一致する行を除きます。

* 鉤括弧(「、『)で始まる行
* Markdownの見出し記号(#)で始まる行
* 既に全角スペースが挿入されている行
* 空行

(2) 全角の感嘆符(！)、疑問符(？)のあとに全角スペースを挿入します。ただし、下記と一致する場合を除きます。

* 直後が感嘆符(！)、疑問符(？)、鉤括弧(」、』)、半角スペースの場合
* 既に全角スペースが挿入されている場合

## Install

1. '8novels-formatter-x.x.x.vsix' をダウンロードします。
1. 「拡張機能」サイドバーを表示します。
1. 「…」アイコンをクリックし、「VSIX からのインストール…」を選択します。
1. ダウンロードした拡張機能を選択します。
1. 正常にインストールされたら、「今すぐ再度読み込む」をクリックして拡張機能を有効にします。
