import { Command, Plugin, WorkspaceLeaf } from 'obsidian';
import { TagExplorerItem } from 'src/interfaces';
import { ProviderBase } from './base';

export class TagPaneProvider extends ProviderBase {
  protected collapseButtonClass = 'nav-action-button';
  protected collapseClickTarget = '.tag-container .tree-item';
  protected leafType = 'tag';

  collapseCommand: Command = {
    id: 'collapse-all-collapse-tag-explorers',
    name: 'Collapse open tags in all tag explorers',
    icon: 'double-up-arrow-glyph',
    callback: () => {
      this.collapseAll();
    }
  };

  expandCommand: Command = {
    id: 'collapse-all-expand-tag-explorers',
    name: 'Expand closed tags in all tag explorers',
    icon: 'double-down-arrow-glyph',
    callback: () => {
      this.expandAll();
    }
  };

  constructor(plugin: Plugin) {
    super(plugin);
  }

  protected collapseOrExpandAll(leaf: WorkspaceLeaf, collapsed: boolean): void {
    // Get tags
    const items = this.getTagItems(leaf);

    // Collapse / expand
    items.forEach((item) => {
      if (item.children.length > 0 && item.collapsed !== collapsed) {
        item.setCollapsed(collapsed);
      }
    });
  }

  protected allCollapsed(leaf: WorkspaceLeaf): boolean {
    return this.tagsAreCollapsed(this.getTagItems(leaf));
  }

  /**
   * Get the root tag pane items from the tag pane view. This property is not documented.
   */
  private getTagItems(tagPane: WorkspaceLeaf): TagExplorerItem[] {
    return Object.values((tagPane.view as any).tagDoms) as TagExplorerItem[];
  }

  /**
   * Given the root tags, checks all children to confirm they are closed. Note that this is recursive.
   */
  private tagsAreCollapsed(items: TagExplorerItem[]): boolean {
    return items.every((i) => i.children.length === 0 || i.collapsed === true);
  }
}
