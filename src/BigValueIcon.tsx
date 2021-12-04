// Library
import React, { PureComponent, CSSProperties } from 'react';
import { DisplayValue, DisplayValueAlignmentFactors, FieldSparkline, TextDisplayOptions } from '@grafana/data';
import { IconName, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  BigValueColorMode,
  BigValueJustifyMode,
  FormattedValueDisplay,
  BigValueTextMode,
  Themeable2,
} from '@grafana/ui';

import { buildLayout } from './BigValueIconLayout';

export enum BigValueIconPosition {
  None = 'none',
  Title = 'title',
  Content = 'content',
}

export enum BigValueIconGraphMode {
  None = 'none',
  Trend = 'trend',
  Line = 'line',
  Area = 'area',
}

export interface Props extends Themeable2 {
  /** Height of the component */
  height: number;
  /** Width of the component */
  width: number;
  /** Value displayed as Big Value */
  value: DisplayValue;
  /** Sparkline values for showing a graph under/behind the value  */
  sparkline?: FieldSparkline;
  /** A arrow showing how if the value is increasing or decreasing */
  trend?: string;
  /** onClick handler for the value */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Custom styling */
  className?: string;
  /** Color mode for coloring the value or the background */
  colorMode: BigValueColorMode;
  /** Show a graph behind/under the value */
  graphMode: BigValueIconGraphMode;
  /** Auto justify value and text or center it */
  justifyMode?: BigValueJustifyMode;
  /** Factors that should influence the positioning of the text  */
  alignmentFactors?: DisplayValueAlignmentFactors;
  /** Explicit font size control */
  text?: TextDisplayOptions;
  /** Specify which text should be visible in the BigValue */
  textMode?: BigValueTextMode;
  /** If true disables the tooltip */
  hasLinks?: boolean;
  /**
   * If part of a series of stat panes, this is the total number.
   * Used by BigValueTextMode.Auto text mode.
   */
  count?: number;
  /** Icon */
  icon?: string;
  /** iconPosition */
  iconPosition?: BigValueIconPosition;
  /** Prefix */
  prefix?: string;
  /** iconPosition */
  suffix?: string;
  /** subtitle */
  subtitle?: string;
  state?: any;
}

export class BigValueIcon extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    justifyMode: BigValueJustifyMode.Auto,
  };

  render() {
    const { onClick, className, hasLinks } = this.props;
    const layout = buildLayout(this.props);
    //const queryState = this.props.state;
    const panelStyles = layout.getPanelStyles();
    const valueAndTitleContainerStyles = layout.getValueAndTitleContainerStyles();
    const valueStyles = layout.getValueStyles();
    const titleStyles = layout.getTitleStyles();
    let dataUnit = typeof this.props.value.suffix !== 'undefined' ? this.props.value.suffix : '';
    let suffix = typeof layout.textValues.suffix !== 'undefined' ? layout.textValues.suffix : '';
    layout.textValues.suffix = dataUnit + ' ' + suffix;
    const textValues = layout.textValues;

    // When there is an outer data link this tooltip will override the outer native tooltip
    const tooltip = hasLinks ? undefined : textValues.tooltip;

    const iconName = this.props.icon === undefined ? ('' as IconName) : (this.props.icon as IconName);

    const trendIconName = this.props.trend === undefined ? ('' as IconName) : (this.props.trend as IconName);

    const iconLookup: IconLookup = { prefix: 'fas', iconName: iconName };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

    const iconTrendLookup: IconLookup = { prefix: 'fas', iconName: trendIconName };
    const iconTrendDefinition: IconDefinition = findIconDefinition(iconTrendLookup);

    const title = this.props.subtitle ? this.props.subtitle : textValues.title;
    const simpleTitleStyle: CSSProperties = {
      margin: 'auto',
      textAlign: 'center',
      padding: '10px',
    };

    const flexDiv: CSSProperties = {
      display: 'flex',
    };
    const icon: CSSProperties = {
      marginRight: '15px',
    };
    const iconTrend: CSSProperties = {
      marginLeft: '15px',
    };
    /*     if (queryState !== 'Done') {
      textValues.color = this.props.theme.colors.background.primary;
      panelStyles.background = this.props.theme.colors.background.primary;
      valueStyles.color = this.props.theme.colors.text.maxContrast;
      titleStyles.color = this.props.theme.colors.text.maxContrast;
      valueAndTitleContainerStyles.color = this.props.theme.colors.text.maxContrast;
    }
 */
    return (
      <div className={className} style={panelStyles} onClick={onClick} title={tooltip}>
        {this.props.iconPosition === BigValueIconPosition.Title ? (
          <div style={valueAndTitleContainerStyles}>
            <div style={titleStyles}>
              <FontAwesomeIcon icon={iconDefinition} style={icon} />
              {title}
            </div>
            {this.props.graphMode === BigValueIconGraphMode.Trend ? (
              <div style={flexDiv}>
                <FormattedValueDisplay value={textValues} style={valueStyles} />
                <FontAwesomeIcon icon={iconTrendDefinition} style={iconTrend} />
              </div>
            ) : (
              <div style={flexDiv}>
                <FormattedValueDisplay value={textValues} style={valueStyles} />
              </div>
            )}
          </div>
        ) : (
          <div style={simpleTitleStyle}>
            <div style={titleStyles}>{title}</div>
            {this.props.graphMode === BigValueIconGraphMode.Trend ? (
              <div style={valueAndTitleContainerStyles}>
                <FontAwesomeIcon icon={iconDefinition} style={icon} />
                <FormattedValueDisplay value={textValues} style={valueStyles} />
                <FontAwesomeIcon icon={iconTrendDefinition} style={iconTrend} />
              </div>
            ) : (
              <div style={valueAndTitleContainerStyles}>
                <FontAwesomeIcon icon={iconDefinition} style={icon} />
                <FormattedValueDisplay value={textValues} style={valueStyles} />
              </div>
            )}
          </div>
        )}

        {layout.renderChart()}
      </div>
    );
  }
}
