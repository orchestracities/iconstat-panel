import React, { PureComponent } from 'react';
import {
  BigValue,
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
      <div style={style.mainElement}>
        <div style={style.subtitleContainer}>
          <div style={style.gridSubtitle}>
            <i className={'fa fa-' + options.iconMode} style={style.titleIconStyle}></i>
          </div>
          <div style={style.gridSubtitle}>{' ' + options.subtitle}</div>
        </div>

        <div style={style.gridContainer}>
          <div style={options.iconMode !== 'none' ? style.gridElement : style.displaynone}>
            <i className={'fa fa-' + options.iconMode} style={style.contentIconStyle} />
          </div>
          <div style={options.prefix !== '' ? style.gridElement : style.displaynone}>
            <h5 style={style.prefix}>{options.prefix}</h5>
          </div>
          <div style={style.gridElement}>
            <BigValue
              value={value.display}
              count={count}
              sparkline={sparkline}
              colorMode={options.colorMode}
              graphMode={options.graphMode}
              justifyMode={options.justifyMode}
              textMode={this.getTextMode()}
              alignmentFactors={alignmentFactors}
              text={options.text}
              width={width - 300}
              height={height}
              theme={config.theme2}
              onClick={openMenu}
              className={targetClassName}
            />
          </div>
          <div style={options.postfix !== '' ? style.gridElement : style.displaynone}>
            <h5 style={style.postfix}>{options.postfix}</h5>
          </div>
        </div>
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
