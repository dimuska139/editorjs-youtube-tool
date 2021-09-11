# YouTube tool

Provides Block Tool for embed YouTube videos for the [Editor.js](https://editorjs.io/).
This is just an example! Please use official [Embed Tool](https://github.com/editor-js/embed) instead.

## Installation

Install the package using NPM or Yarn

### Via NPM
```shell
npm i --save editorjs-youtube-tool
```

### Via Yarn
```shell
yarn add editorjs-youtube-tool
```

Import module at your application

```javascript
import EditorJSYoutubeTool from "editorjs-youtube-tool";
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/index.js` file to your page.

### Load from CDN

You can load EditorJSYoutubeTool from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/editorjs-youtube-tool):

`https://cdn.jsdelivr.net/npm/editorjs-youtube-tool`

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-youtube-tool"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
const editor = EditorJS({
  ...
  
  tools: {
    ...
    youtube: EditorJSYoutubeTool,
  }
  
  ...
});
```

## Output data

YoutubeTool block returns code:

```json
{
    "type" : "youtube",
    "data" : {
        "id": "LOPHWxybSCA",
        "url": "https://www.youtube.com/watch?v=LOPHWxybSCA&t=2844s&ab_channel=AlexandrKupnyi",
        "embedUrl": "https://www.youtube.com/embed/LOPHWxybSCA"
    }
}
```