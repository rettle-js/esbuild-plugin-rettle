type searchValue = string | RegExp;
type replaceValue = string;

type replacesInterface = [searchValue, replaceValue]
export const replacer = (hash:string):Array<replacesInterface> => [
  // Rettle Original
  [/rettle-ref/g, `data-ref-${hash}`],
  [new RegExp("[fr]", "g"), hash],
  // Other Events
  [/rettle-scroll/g, `data-scroll-${hash}`],
  [/rettle-resize/g, `data-resize-${hash}`],
  [/rettle-load/g, `data-load-${hash}`],
  // Mouse Events
  [/rettle-click/g, `data-click-${hash}`],
  [/rettle-mouseenter/g, `data-mouseenter-${hash}`],
  [/rettle-mouseleave/g, `data-mouseleave-${hash}`],
  [/rettle-mouseover/g, `data-mouseover-${hash}`],
  [/rettle-mousedown/g, `data-mousedown-${hash}`],
  [/rettle-mouseup/g, `data-mouseup-${hash}`],
  [/rettle-mouseout/g, `data-mouseout-${hash}`],
  [/rettle-mousemove/g, `data-mousemove-${hash}`],
  [/rettle-dblclick/g, `data-dblclick-${hash}`],
  // Dom Events
  [/rettle-DOMFocusIn/g, `data-DOMFocusIn-${hash}`],
  [/rettle-DOMFocusOut/g, `data-DOMFocusOut-${hash}`],
  [/rettle-DOMActivate/g, `data-DOMActivate-${hash}`],
  // Inputs Events
  [/rettle-change/g, `data-change-${hash}`],
  [/rettle-select/g, `data-select-${hash}`],
  [/rettle-submit/g, `data-submit-${hash}`],
  [/rettle-reset/g, `data-reset-${hash}`],
  [/rettle-focus/g, `data-focus-${hash}`],
  [/rettle-blur/g, `data-blur-${hash}`],
  // Keyboard Events
  [/rettle-keypress/g, `data-keypress-${hash}`],
  [/rettle-keydown/g, `data-keydown-${hash}`],
  [/rettle-keyup/g, `data-keyup-${hash}`],
]