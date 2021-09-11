// @ts-ignore
import * as EditorJS from '@editorjs/editorjs';
import "./index.css";

interface YoutubeData extends EditorJS.BlockToolData {
    id: string
    url: string
    embedUrl: string
}

export default class EditorJSYoutubeTool implements EditorJS.BaseTool {
    playerEl: HTMLElement;
    inputEl: HTMLInputElement;
    readonly: boolean;
    isTouched: boolean = false;
    data: YoutubeData;

    cssClasses: {
        block: string;
        input: string;
        error: string;
        video: string;
        main: string;
    }

    constructor({ data, api, readonly }: { data: YoutubeData, api: EditorJS.API, readonly: boolean }) {
        this.readonly = readonly;
        this.data = data;
        this.cssClasses = {
            block: api.styles.block,
            input: api.styles.input,
            error: 'invalid',
            video: 'youtube-video-wrapper',
            main: 'youtube-tool',
        }

        const input = document.createElement('input');
        input.readOnly = this.readonly;
        input.value = this.data && this.data.url ? this.data.url : '';
        input.classList.add(this.cssClasses!.input);
        input.placeholder = "YouTube link";

        const _this = this;
        input.addEventListener('change', (event) => {
            _this.isTouched = true;
            _this.renderPreview();
        });

        this.inputEl = input;

        this.playerEl = document.createElement('div');
    }

    static get isInline() {
        return false;
    }

    static get isReadOnlySupported() {
        return true;
    }

    static get toolbox(): { icon: string; title?: string } {
        return {
            icon: String(`<svg xmlns="http://www.w3.org/2000/svg" width="17pt" height="17pt" viewBox="0 0 17 17">
            <path d="M 16.683594 4.476562 C 16.476562 3.574219 15.738281 2.90625 14.847656 2.808594 C 12.742188 2.570312 10.613281 2.570312 8.492188 2.570312 C 6.371094 2.570312 4.238281 2.570312 2.132812 2.808594 C 1.246094 2.90625 0.507812 3.574219 0.300781 4.476562 C 0.00390625 5.761719 0 7.164062 0 8.488281 C 0 9.8125 0 11.214844 0.296875 12.503906 C 0.503906 13.40625 1.242188 14.070312 2.128906 14.171875 C 4.234375 14.40625 6.367188 14.40625 8.488281 14.40625 C 10.609375 14.40625 12.742188 14.40625 14.847656 14.171875 C 15.734375 14.070312 16.472656 13.40625 16.679688 12.503906 C 16.976562 11.214844 16.976562 9.8125 16.976562 8.488281 C 16.976562 7.164062 16.980469 5.761719 16.683594 4.476562 Z M 6.296875 11.125 C 6.296875 9.246094 6.296875 7.386719 6.296875 5.507812 C 8.097656 6.449219 9.886719 7.382812 11.695312 8.324219 C 9.890625 9.261719 8.101562 10.1875 6.296875 11.125 Z M 6.296875 11.125 "/>
          </svg>`),
            title: "YouTube"
        }
    }

    getIdFromUrl(url: string): string {
        const parts = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(parts[2] === undefined) {
            return ''
        }

        return parts[2].split(/[^0-9a-z_-]/i)[0];
    }

    getEmbedUrl(videoId: string): string {
        return `https://www.youtube.com/embed/${videoId}`
    }

    private renderPreview() {
        this.playerEl.innerHTML = '';

        const videoId = this.getIdFromUrl(this.inputEl.value);
        if (videoId == '') {
            if (this.isTouched) {
                this.inputEl.classList.add(this.cssClasses!.error);
            }
            return
        }
        this.inputEl.classList.remove(this.cssClasses!.error);

        const embedUrl = this.getEmbedUrl(videoId);

        const videoContainer = document.createElement('div');
        videoContainer.classList.add(this.cssClasses!.video);

        const iframe = document.createElement('iframe');
        iframe.setAttribute("src", embedUrl);
        iframe.setAttribute("allowfullscreen", "true");
        videoContainer.appendChild(iframe);
        this.playerEl.appendChild(videoContainer);
    }

    render(): HTMLElement {
        const pluginWrapper = document.createElement('div');
        pluginWrapper.classList.add(this.cssClasses.block, this.cssClasses.main);

        pluginWrapper.appendChild(this.playerEl);
        pluginWrapper.appendChild(this.inputEl);
        this.renderPreview();
        return pluginWrapper;
    }

    save(block: HTMLDivElement): YoutubeData {
        const url = this.inputEl.value;
        const videoId = this.getIdFromUrl(url);
        return {
            id: videoId,
            url: url,
            embedUrl: this.getEmbedUrl(videoId),
        }
    }
}

