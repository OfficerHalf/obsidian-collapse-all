import { Settings } from './interfaces';

export const COLLAPSE_ALL_ICON =
  '<svg viewBox="0 0 100 100" class="double-up-arrow-glyph" width="18" height="18"><path fill="currentColor" stroke="currentColor" d="M49.9,16.7c-0.9,0-1.7,0.4-2.3,1L14.3,51c-0.9,0.8-1.2,2.1-0.9,3.2c0.3,1.2,1.2,2.1,2.4,2.4s2.4,0,3.2-0.9l31-31l31,31 c0.8,0.9,2.1,1.2,3.2,0.9c1.2-0.3,2.1-1.2,2.4-2.4s0-2.4-0.9-3.2L52.4,17.6C51.7,17,50.8,16.7,49.9,16.7L49.9,16.7z M49.9,40 c-0.9,0-1.7,0.4-2.3,1L14.3,74.3c-0.9,0.8-1.2,2.1-0.9,3.2c0.3,1.2,1.2,2.1,2.4,2.4s2.4,0,3.2-0.9l31-31l31,31 c0.8,0.9,2.1,1.2,3.2,0.9c1.2-0.3,2.1-1.2,2.4-2.4c0.3-1.2,0-2.4-0.9-3.2L52.4,41C51.7,40.3,50.8,40,49.9,40L49.9,40z"></path></svg>';

export const EXPAND_ALL_ICON =
  '<svg viewBox="0 0 100 100" class="double-down-arrow-glyph" width="18" height="18"><path fill="currentColor" stroke="currentColor" d="M83.3,20c-0.9,0-1.7,0.4-2.3,1L50,52L19,21c-0.6-0.6-1.5-1-2.4-1c-1.4,0-2.6,0.8-3.1,2.1c-0.5,1.3-0.2,2.7,0.8,3.6 L47.6,59c1.3,1.3,3.4,1.3,4.7,0l33.3-33.3c1-1,1.3-2.4,0.8-3.7C85.9,20.7,84.7,19.9,83.3,20z M83.3,43.3c-0.9,0-1.7,0.4-2.3,1 l-31,31l-31-31c-0.6-0.6-1.5-1-2.4-1c-1.4,0-2.6,0.8-3.1,2.1s-0.2,2.7,0.8,3.6l33.3,33.3c1.3,1.3,3.4,1.3,4.7,0L85.7,49 c1-1,1.3-2.4,0.8-3.7C85.9,44.1,84.7,43.3,83.3,43.3L83.3,43.3z"></path></svg>';

export const DEFAULT_SETTINGS: Settings = {
  commands: {
    global: true,
    FileExplorer: false,
    TagPane: false
  },
  folderContextMenu: true,
  expandAttachmentFolder: false,
  splitButtons: false
};

export enum ProviderType {
  FileExplorer = 'FileExplorer',
  TagPane = 'TagPane'
}
