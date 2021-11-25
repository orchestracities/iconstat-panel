import React, { PureComponent } from 'react';
import { DataLinksContextMenu, VizRepeater, VizRepeaterRenderValueProps, BigValueTextMode } from '@grafana/ui';
import {
  DisplayValueAlignmentFactors,
  DataFrame,
  FieldDisplay,
  FieldType,
  getDisplayValueAlignmentFactors,
  getFieldDisplayValues,
  NumericRange,
  PanelProps,
} from '@grafana/data';
import { config } from './config';
import { StatPanelOptions } from './types';
import { BigValueIconGraphMode, BigValueIcon } from './BigValueIcon';
import { DataLinksContextMenuApi } from '@grafana/ui/components/DataLinks/DataLinksContextMenu';
//import { findNumericFieldMinMax } from '@grafana/data/field/fieldOverrides';
import { isNumber } from 'lodash';

export declare function findNumericFieldMinMax(data: DataFrame[]): NumericRange;

export class StatPanel extends PureComponent<PanelProps<StatPanelOptions>> {
  renderComponent = (
    valueProps: VizRepeaterRenderValueProps<FieldDisplay, DisplayValueAlignmentFactors>,
    menuProps: DataLinksContextMenuApi
  ): JSX.Element => {
    const { timeRange } = this.props;
    const { value, alignmentFactors, width, height, count } = valueProps;
    const { openMenu, targetClassName } = menuProps;
    let sparkline = value.sparkline;
    let trend = undefined;
    if (sparkline) {
      sparkline.timeRange = timeRange;
    }

    if (value.view && value.view.dataFrame) {
      for (let field of value.view.dataFrame.fields) {
        if (field.name !== value.display.title) {
          continue;
        }
        if (field.state && field.state.calcs && field.state.calcs.firstNotNull && field.state.calcs.lastNotNull) {
          trend = this.getTrendIcon(field.state.calcs.lastNotNull - field.state.calcs.firstNotNull);
        }
      }
    }

    const options: any = this.props.options;

    return (
      <BigValueIcon
        value={value.display}
        count={count}
        sparkline={sparkline}
        trend={trend}
        colorMode={options.colorMode}
        graphMode={options.graphMode}
        justifyMode={options.justifyMode}
        textMode={this.getTextMode()}
        alignmentFactors={alignmentFactors}
        text={options.text}
        width={width}
        height={height}
        theme={config.theme2}
        onClick={openMenu}
        className={targetClassName}
        icon={options.icon}
        iconPosition={options.iconPosition}
        prefix={options.prefix}
        suffix={options.suffix}
        subtitle={options.subtitle}
      />
    );
  };
  constructor(props: any) {
    super(props);
  }
  getTextMode() {
    const { options, fieldConfig, title } = this.props;

    // If we have manually set displayName or panel title switch text mode to value and name
    if (options.textMode === BigValueTextMode.Auto && (fieldConfig.defaults.displayName || !title)) {
      return BigValueTextMode.ValueAndName;
    }

    return options.textMode;
  }

  renderValue = (valueProps: VizRepeaterRenderValueProps<FieldDisplay, DisplayValueAlignmentFactors>): JSX.Element => {
    const { value } = valueProps;
    const { getLinks, hasLinks } = value;

    if (hasLinks && getLinks) {
      return (
        <DataLinksContextMenu links={getLinks} config={value.field}>
          {(api) => {
            return this.renderComponent(valueProps, api);
          }}
        </DataLinksContextMenu>
      );
    }

    return this.renderComponent(valueProps, {});
  };

  getValues = (): FieldDisplay[] => {
    const { data, options, replaceVariables, fieldConfig, timeZone } = this.props;

    let globalRange: NumericRange | undefined = undefined;

    for (let frame of data.series) {
      for (let field of frame.fields) {
        let { config } = field;
        // mostly copied from fieldOverrides, since they are skipped during streaming
        // Set the Min/Max value automatically
        if (field.type === FieldType.number) {
          if (field.state?.range) {
            continue;
          }
          if (!globalRange && (!isNumber(config.min) || !isNumber(config.max))) {
            globalRange = findNumericFieldMinMax(data.series);
          }
          const min = config.min ?? globalRange!.min;
          const max = config.max ?? globalRange!.max;
          field.state = field.state ?? {};
          field.state.range = { min, max, delta: max! - min! };
        }
      }
    }

    return getFieldDisplayValues({
      fieldConfig,
      reduceOptions: options.reduceOptions,
      replaceVariables,
      theme: config.theme2,
      data: data.series,
      sparkline: options.graphMode === BigValueIconGraphMode.Area,
      timeZone,
    });
  };

  getTrendIcon = (trendIndicatorValue: number): string => {
    if (trendIndicatorValue < 0) {
      return 'arrow-down';
    } else if (trendIndicatorValue > 0) {
      return 'arrow-up';
    } else {
      return 'arrow-right';
    }
  };

  render() {
    const { height, width, data, renderCounter, options } = this.props;

    return (
      <VizRepeater
        getValues={this.getValues}
        getAlignmentFactors={getDisplayValueAlignmentFactors}
        renderValue={this.renderValue}
        width={width}
        height={height}
        source={data}
        itemSpacing={1}
        renderCounter={renderCounter}
        orientation={options.orientation}
      />
    );
  }
}
