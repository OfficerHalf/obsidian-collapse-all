import { App, PluginSettingTab, Setting } from 'obsidian';
import { CollapseAllPlugin } from './plugin';

export class CollapseAllPluginSettings extends PluginSettingTab {
  constructor(app: App, readonly plugin: CollapseAllPlugin) {
    super(app, plugin);
  }

  display() {
    this.containerEl.empty();
    this.containerEl.createEl('h2', { text: 'Collapse all plugin settings.' });

    new Setting(this.containerEl)
      .setName('Split buttons')
      .setDesc(
        'If enabled, instead of swapping between collapse and expand, there will be two separate buttons, one for collapse and one for expand.'
      )
      .addToggle((toggle) => {
        toggle
          .setTooltip('Split buttons')
          .setValue(this.plugin.settings.splitButtons)
          .onChange(async (value) => {
            this.plugin.settings.splitButtons = value;
            this.plugin.onunload();
            this.plugin.allProviders.forEach((provider) => {
              provider.addButtons();
            });
            await this.plugin.saveSettings();
          });
      });

    new Setting(this.containerEl)
      .setName('Folder context menu')
      .setDesc(
        'If enabled, add commands to the folder right-click context menu to collapse and expand that folder and its children only.'
      )
      .addToggle((toggle) => {
        toggle
          .setTooltip('Folder context menu')
          .setValue(this.plugin.settings.folderContextMenu)
          .onChange(async (value) => {
            this.plugin.settings.folderContextMenu = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(this.containerEl)
      .setName('Expand attachment folder')
      .setDesc(
        'If enabled, the attachment folder will be expanded with other folders. Otherwise, it will be skipped.'
      )
      .addToggle((toggle) => {
        toggle
          .setTooltip('Expand attachment folder')
          .setValue(this.plugin.settings.expandAttachmentFolder)
          .onChange(async (value) => {
            this.plugin.settings.expandAttachmentFolder = value;
            await this.plugin.saveSettings();
          });
      });

    this.containerEl.createEl('h3', { text: 'Command settings' });
    this.containerEl.createEl('p', {
      text: 'Each toggle controls whether commands should be added to collapse and expand that view, or global which operates on all available views. Updates on app reload.'
    });

    // Add global toggle
    new Setting(this.containerEl).setName('Global').addToggle((toggle) => {
      toggle
        .setTooltip('Global')
        .setValue(this.plugin.settings.commands.global)
        .onChange(async (value) => {
          this.plugin.settings.commands.global = value;
          await this.plugin.saveSettings();
        });
    });

    // Add individual toggles
    this.plugin.allProviders.forEach((provider) => {
      new Setting(this.containerEl)
        .setName(provider.displayName)
        .addToggle((toggle) => {
          toggle
            .setTooltip(provider.displayName)
            .setValue(this.plugin.settings.commands[provider.providerType])
            .onChange(async (value) => {
              this.plugin.settings.commands[provider.providerType] = value;
              await this.plugin.saveSettings();
            });
        });
    });
  }
}
