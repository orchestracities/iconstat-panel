import { sharedSingleStatPanelChangedHandler, BigValueColorMode, BigValueTextMode } from '@grafana/ui';
import { FieldColorModeId, FieldConfigSource, PanelModel } from '@grafana/data';
import { StatPanelOptions } from './types';
import { BigValueIconGraphMode, BigValueIconPosition } from 'BigValueIcon';

// This is called when the panel changes from another panel
export const statPanelChangedHandler = (
  panel: PanelModel<Partial<StatPanelOptions>> | any,
  prevPluginId: string,
  prevOptions: any
) => {
  // This handles most config changes
  const options = sharedSingleStatPanelChangedHandler(panel, prevPluginId, prevOptions) as StatPanelOptions;

  // Changing from angular singlestat
  if (
    prevOptions.angular &&
    (prevPluginId === 'singlestat' ||
      prevPluginId === 'grafana-singlestat-panel' ||
      prevPluginId === 'statistics-panel')
  ) {
    const oldOptions = prevOptions.angular;

    options.graphMode = BigValueIconGraphMode.None;
    if (oldOptions.sparkline && oldOptions.sparkline.show) {
      options.graphMode = BigValueIconGraphMode.Area;
    }
    if (oldOptions.trendIndicator && oldOptions.trendIndicator.show) {
      options.graphMode = BigValueIconGraphMode.Trend;
    }

    if (oldOptions.iconPosition && oldOptions.iconPosition === 'value') {
      options.iconPosition = BigValueIconPosition.Content;
    } else {
      options.iconPosition = BigValueIconPosition.Title;
    }

    if (oldOptions.iconType) {
      options.icon = oldOptions.iconType;
    }

    if (oldOptions.prefix) {
      options.prefix = oldOptions.prefix;
    }

    if (oldOptions.postfix) {
      options.suffix = oldOptions.postfix;
    }

    if (oldOptions.subtitle) {
      options.subtitle = oldOptions.subtitle;
    }

    if (oldOptions.valueName) {
      options.reduceOptions = { values: false, calcs: [] };
    }
    if (oldOptions.valueName && oldOptions.valueName === 'avg') {
      options.reduceOptions.calcs = ['mean'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'min') {
      options.reduceOptions.calcs = ['mean'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'max') {
      options.reduceOptions.calcs = ['mean'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'max') {
      options.reduceOptions.calcs = ['mean'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'current') {
      options.reduceOptions.calcs = ['last'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'total') {
      options.reduceOptions.calcs = ['sum'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'first') {
      options.reduceOptions.calcs = ['first'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'delta') {
      options.reduceOptions.calcs = ['mean'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'diff') {
      options.reduceOptions.calcs = ['diff'];
    } else if (oldOptions.valueName && oldOptions.valueName === 'range') {
      options.reduceOptions.calcs = ['range'];
    }

    if (oldOptions.colorBackground) {
      options.colorMode = BigValueColorMode.Background;
    } else if (oldOptions.colorValue) {
      options.colorMode = BigValueColorMode.Value;
    } else {
      options.colorMode = BigValueColorMode.None;
      if (oldOptions.sparkline?.lineColor && options.graphMode === BigValueIconGraphMode.Area) {
        const cfg: FieldConfigSource = panel.fieldConfig ?? {};
        cfg.defaults.color = {
          mode: FieldColorModeId.Fixed,
          fixedColor: oldOptions.sparkline.lineColor,
        };
        panel.fieldConfig = cfg;
      }
    }

    if (oldOptions.valueName === 'name') {
      options.textMode = BigValueTextMode.Name;
    }
  }

  return options;
};
