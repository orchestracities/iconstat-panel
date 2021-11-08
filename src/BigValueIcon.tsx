import React from 'react';
// Library
import { DisplayValue, DisplayValueAlignmentFactors, FieldSparkline, TextDisplayOptions } from '@grafana/data';

import {
  BigValue,
  BigValueGraphMode,
  BigValueColorMode,
  BigValueJustifyMode,
  FormattedValueDisplay,
  BigValueTextMode,
  Themeable2,
} from '@grafana/ui';
import { buildLayout } from './BigValueIconLayout';

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
}

export class BigValueIcon extends BigValue {
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
    const textValues = layout.textValues;

    // When there is an outer data link this tooltip will override the outer native tooltip
    const tooltip = hasLinks ? undefined : textValues.tooltip;

    return (
      <div className={className} style={panelStyles} onClick={onClick} title={tooltip}>
        <div style={valueAndTitleContainerStyles}>
          {textValues.title && <div style={titleStyles}>{textValues.title}</div>}
          <FormattedValueDisplay value={textValues} style={valueStyles} />
        </div>
        {layout.renderChart()}
      </div>
    );
  }
}
