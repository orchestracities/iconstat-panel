// Library
import React, { PureComponent, CSSProperties } from 'react';
import { DisplayValue, DisplayValueAlignmentFactors, FieldSparkline, TextDisplayOptions } from '@grafana/data';
import { IconName, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  BigValueGraphMode,
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

export interface Props extends Themeable2 {
  /** Height of the component */
  height: number;
  /** Width of the component */
  width: number;
  /** Value displayed as Big Value */
  value: DisplayValue;
  /** Sparkline values for showing a graph under/behind the value  */
  sparkline?: FieldSparkline;
  /** onClick handler for the value */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Custom styling */
  className?: string;
  /** Color mode for coloring the value or the background */
  colorMode: BigValueColorMode;
  /** Show a graph behind/under the value */
  graphMode: BigValueGraphMode;
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
}

export class BigValueIcon extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    justifyMode: BigValueJustifyMode.Auto,
  };

  render() {
    const { onClick, className, hasLinks } = this.props;
    const layout = buildLayout(this.props);
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

    const iconLookup: IconLookup = { prefix: 'fas', iconName: iconName };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
    const title = this.props.subtitle === '' ? textValues.title : this.props.subtitle;
    const simpleTitleStyle: CSSProperties = {
      margin: 'auto',
      textAlign: 'center',
      padding: '10px',
    };

    return (
      <div className={className} style={panelStyles} onClick={onClick} title={tooltip}>
        {this.props.iconPosition === BigValueIconPosition.Title ? (
          <div style={valueAndTitleContainerStyles}>
            <div style={titleStyles}>
              <FontAwesomeIcon icon={iconDefinition} />
              &nbsp;
              {title}
            </div>
            <FormattedValueDisplay value={textValues} style={valueStyles} />
          </div>
        ) : (
          <div style={simpleTitleStyle}>
            <div style={titleStyles}>{title}</div>
            <div style={valueAndTitleContainerStyles}>
              <FontAwesomeIcon icon={iconDefinition} /> <FormattedValueDisplay value={textValues} style={valueStyles} />
            </div>
          </div>
        )}

        {layout.renderChart()}
      </div>
    );
  }
}
