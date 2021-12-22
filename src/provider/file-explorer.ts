import { Command, Plugin, TFolder, WorkspaceLeaf } from 'obsidian';
import { FileExplorerItem } from 'src/interfaces';
import { ProviderBase } from './base';

export class FileExplorerProvider extends ProviderBase {
  protected collapseButtonClass = 'nav-action-button';
  protected collapseClickTarget = '.nav-folder-title';
  protected leafType = 'file-explorer';

  collapseCommand: Command = {
    id: 'collapse-all-collapse-file-explorers',
    name: 'Collapse open folders in all file explorers',
    icon: 'double-up-arrow-glyph',
    callback: () => {
      this.collapseAll();
    }
  };

  expandCommand: Command = {
    id: 'collapse-all-expand-file-explorers',
    name: 'Expand closed folders in all file explorers',
    icon: 'double-down-arrow-glyph',
    callback: () => {
      this.expandAll();
    }
  };

  constructor(plugin: Plugin) {
    super(plugin);
  }

  protected collapseOrExpandAll(leaf: WorkspaceLeaf, collapsed: boolean): void {
    const items = this.getExplorerItems(leaf);
    items.forEach((item) => {
      if (this.explorerItemIsFolder(item) && item.collapsed !== collapsed) {
        item.setCollapsed(collapsed);
      }
    });
  }

  protected allCollapsed(leaf: WorkspaceLeaf): boolean {
    const items = this.getExplorerItems(leaf);
    return items.every(
      (i) => !this.explorerItemIsFolder(i) || i.collapsed === true
    );
  }

  /**
   * Get all `fileItems` on explorer view. This property is not documented.
   */
  private getExplorerItems(leaf: WorkspaceLeaf): FileExplorerItem[] {
    return Object.values((leaf.view as any).fileItems) as FileExplorerItem[];
  }

  /**
   * Ensures given explorer item is a folder and not the root or a note
   */
  private explorerItemIsFolder(item: FileExplorerItem): boolean {
    return (
      item.file instanceof TFolder &&
      item.file.path !== '/' &&
      item.collapsed !== undefined
    );
  }
}
