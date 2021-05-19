import { Plugin, WorkspaceLeaf } from 'obsidian';
import { COLLAPSE_ALL_ICON } from './constants';
import { FileExplorerItem } from './interfaces';

export class CollapseAllPlugin extends Plugin {
  async onload(): Promise<void> {
    // Initialize
    this.app.workspace.onLayoutReady(() => {
      const explorers = this.getFileExplorers();
      explorers.forEach((exp) => {
        this.addCollapseButton(exp);
      });
    });

    // File explorers that get opened later on
    this.registerEvent(
      this.app.workspace.on('layout-change', () => {
        const explorers = this.getFileExplorers();
        explorers.forEach((exp) => {
          this.addCollapseButton(exp);
        });
      })
    );

    // Add to command palette
    this.addCommand({
      id: 'collapse-all-collapse',
      name: 'Collapse all open folders',
      icon: 'double-up-arrow-glyph',
      callback: () => {
        this.collapseAll();
      }
    });
  }

  onunload(): void {
    // Remove all collapse buttons
    const explorers = this.getFileExplorers();
    explorers.forEach((exp) => {
      this.removeCollapseButton(exp);
    });
  }

  /**
   * Adds the collapse button to a file explorer leaf.
   */
  private addCollapseButton(explorer: WorkspaceLeaf): void {
    // TODO: containerEl is not a public property of the leaf. Is there a better way?
    const container = (explorer as any).containerEl as HTMLDivElement;
    const navContainer = container.querySelector(
      'div.nav-buttons-container'
    ) as HTMLDivElement;
    if (navContainer.querySelector('.collapse-button')) {
      return;
    }

    const newIcon = document.createElement('div');
    // TODO: Better way to get this icon?
    newIcon.innerHTML = COLLAPSE_ALL_ICON;
    newIcon.className = 'nav-action-button collapse-button';
    newIcon.setAttribute('aria-label', 'Collapse All');
    this.registerDomEvent(newIcon, 'click', () => {
      this.collapseAll();
    });
    navContainer.appendChild(newIcon);
  }

  /**
   * Remove the collapse button from a given file explorer leaf.
   */
  private removeCollapseButton(explorer: WorkspaceLeaf): void {
    // TODO: containerEl is not a public property of the leaf. Is there a better way?
    const container = (explorer as any).containerEl as HTMLDivElement;
    const navContainer = container.querySelector(
      'div.nav-buttons-container'
    ) as HTMLDivElement;
    const button = navContainer.querySelector('.collapse-button');
    if (button) {
      button.remove();
    }
  }

  /**
   * Get all file explorers, collapse all open folders.
   */
  private collapseAll(): void {
    const explorers = this.getFileExplorers();
    if (explorers) {
      explorers.forEach((exp) => {
        const items = this.getExplorerItems(exp);
        items.forEach((item) => {
          if (this.explorerItemIsFolder(item) && item.collapsed !== true) {
            item.setCollapsed(true);
          }
        });
      });
    }
  }

  /**
   * Returns all loaded file explorer leaves
   */
  private getFileExplorers(): WorkspaceLeaf[] {
    return this.app.workspace.getLeavesOfType('file-explorer');
  }

  /**
   * Get all `fileItems` on explorer view. This property is not documented.
   */
  private getExplorerItems(explorer: WorkspaceLeaf): FileExplorerItem[] {
    return Object.values(
      (explorer.view as any).fileItems
    ) as FileExplorerItem[];
  }

  /**
   * Ensures given explorer item is a folder and not the root or a note
   */
  private explorerItemIsFolder(item: FileExplorerItem): boolean {
    return (
      'children' in item.file &&
      item.file.path !== '/' &&
      item.collapsed !== undefined
    );
  }
}
