import React, { PureComponent } from 'react';
import {
  BigValueGraphMode,
  DataLinksContextMenu,
  VizRepeater,
  VizRepeaterRenderValueProps,
  BigValueTextMode,
} from '@grafana/ui';
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
import { BigValueIcon } from './BigValueIcon';
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
    if (sparkline) {
      sparkline.timeRange = timeRange;
    }

    const options: any = this.props.options;

    let display = value.display;
    // let icon = null;
    // if (options.iconMode !== 'none') {
    //   icon = 'fa fa-' + options.iconMode;
    // }
    // if (options.iconDisplay === 'content') {
    //   display.text = '<i className=' + icon + '></i>' + '&nbsp;' + display.text;
    // }
    // if (options.prefix !== '') {
    //   display.text = options.prefix + ' ' + display.text;
    // }
    // if (options.postfix !== '') {
    //   display.text = display.text + ' ' + options.postfix;
    // }

    const style: any = {
      gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
      },
      subtitleContainer: {
        display: 'block',
        gridTemplateColumns: 'auto auto',
      },
      gridElement: {
        margin: 'auto',
        textAlign: 'center',
        display: 'inline',
        padding: '20px',
      },
      gridSubtitle: {
        margin: 'auto',
        textAlign: 'center',
        display: 'inline',
      },
      displaynone: {
        display: 'none',
      },
      contentIconStyle: {
        fontSize: '4rem',
        display: options.iconDisplay === 'content' ? 'contents' : 'none',
      },
      titleIconStyle: {
        fontSize: '2rem',
        display: options.iconDisplay === 'title' ? 'contents' : 'none',
      },
      mainElement: {
        textAlign: 'center',
        width: width,
      },
      prefix: {
        fontSize: options.prefixFont,
      },
      postfix: {
        fontSize: options.postfixFont,
      },
    };
    return (
      <div>
        <div style={style.subtitleContainer}>
          <i className={'fa fa-' + options.iconMode} style={style.titleIconStyle}></i>
          &nbsp;
          <span style={style.gridSubtitle}>{' ' + options.subtitle}</span>
        </div>
        <BigValueIcon
          value={display}
          count={count}
          sparkline={sparkline}
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
        />
      </div>
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
      sparkline: options.graphMode !== BigValueGraphMode.None,
      timeZone,
    });
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
