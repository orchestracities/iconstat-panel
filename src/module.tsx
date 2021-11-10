import {
  BigValueColorMode,
  BigValueTextMode,
  commonOptionsBuilder,
  sharedSingleStatMigrationHandler,
} from '@grafana/ui';
import { PanelPlugin } from '@grafana/data';
import { addOrientationOption, addStandardDataReduceOptions, StatPanelOptions } from './types';
import { StatPanel } from './StatPanel';
import { statPanelChangedHandler } from './StatMigrations';
import { BigValueIconPosition } from './BigValueIcon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add the entire icon set
library.add(fas);

export const plugin = new PanelPlugin<StatPanelOptions>(StatPanel)
  .useFieldConfig()
  .setPanelOptions((builder) => {
    const mainCategory = ['Stat styles'];
    const iconType = Object.keys(new Map(Object.entries(library)).get('definitions').fas);
    let iconValues: any = [];
    iconValues.push({ value: 'none', label: 'none' });
    iconType.map((n) => iconValues.push({ value: n, label: n }));
    addStandardDataReduceOptions(builder);
    addOrientationOption(builder, mainCategory);
    commonOptionsBuilder.addTextSizeOptions(builder);

    builder.addSelect({
      path: 'textMode',
      name: 'Text mode',
      description: 'Control if name and value is displayed or just name',
      category: mainCategory,
      settings: {
        options: [
          { value: BigValueTextMode.Auto, label: 'Auto' },
          { value: BigValueTextMode.Value, label: 'Value' },
          { value: BigValueTextMode.ValueAndName, label: 'Value and name' },
          { value: BigValueTextMode.Name, label: 'Name' },
          { value: BigValueTextMode.None, label: 'None' },
        ],
      },
      defaultValue: 'auto',
    });

    builder.addSelect({
      path: 'icon',
      name: 'Icon',
      description: 'Select icon',
      category: mainCategory,
      settings: {
        options: iconValues,
      },
      defaultValue: 'none',
    });
    builder.addSelect({
      path: 'iconPosition',
      name: 'Icon position',
      description: 'Icon position',
      category: mainCategory,
      settings: {
        options: [
          { value: BigValueIconPosition.Content, label: 'content' },
          { value: BigValueIconPosition.Title, label: 'title' },
        ],
      },
      defaultValue: 'content',
    });
    builder.addTextInput({
      path: 'subtitle',
      name: 'subtitle',
      description: 'subtitle',
      category: mainCategory,

      defaultValue: '',
    });
    builder.addTextInput({
      path: 'prefix',
      name: 'prefix',
      description: 'prefix',
      category: mainCategory,

      defaultValue: '',
    });
    builder.addTextInput({
      path: 'suffix',
      name: 'suffix',
      description: 'suffix',
      category: mainCategory,

      defaultValue: '',
    });

    builder
      .addRadio({
        path: 'colorMode',
        name: 'Color mode',
        defaultValue: BigValueColorMode.Value,
        category: mainCategory,
        settings: {
          options: [
            { value: BigValueColorMode.None, label: 'None' },
            { value: BigValueColorMode.Value, label: 'Value' },
            { value: BigValueColorMode.Background, label: 'Background' },
          ],
        },
      })
      .addRadio({
        path: 'graphMode',
        name: 'Graph mode',
        description: 'Stat panel graph / sparkline mode',
        category: mainCategory,
        defaultValue: 'area',
        settings: {
          options: [
            { value: 'none', label: 'None' },
            { value: 'area', label: 'Area' },
          ],
        },
      })
      .addRadio({
        path: 'justifyMode',
        name: 'Text alignment',
        defaultValue: 'auto',
        category: mainCategory,
        settings: {
          options: [
            { value: 'auto', label: 'Auto' },
            { value: 'center', label: 'Center' },
          ],
        },
      });
  })
  .setNoPadding()
  .setPanelChangeHandler(statPanelChangedHandler)
  .setMigrationHandler(sharedSingleStatMigrationHandler);
