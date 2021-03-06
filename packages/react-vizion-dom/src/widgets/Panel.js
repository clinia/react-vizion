import Panel from '../components/Panel';

/**
 * The Panel widget wraps other widgets in a consistent panel design.
 * It also reacts, indicates and set CSS classes when widgets are no more relevant for refining.
 * E.g. when a RefinementList becomes empty because of the current search results.
 *
 * @name Panel
 * @kind widget
 * @propType {string} [className] - Adds a className on the root element.
 * @propType {node} [header] - Adds a header to the widget.
 * @propType {node} [footer] - Adds a footer to the widget.
 * @themeKey cvi-panel - the root div of the Panel
 * @themeKey cvi-panel--noRefinement - the root div of the Panel without refinement
 * @themeKey cvi-panel-header - the header of the Panel (optional)
 * @themeKey cvi-panel-body - the body of the Panel
 * @themeKey cvi-panel-footer - the footer of the Panel (optional)
 * @example
 * import React from 'react';
 * import clinia from 'clinia/lite';
 * import { Vizion, Panel, RefinementList } from '@clinia/react-vizion-dom';
 *
 * const searchClient = clinia(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <Vizion
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <Panel header="services">
 *       <RefinementList property="services" />
 *     </Panel>
 *   </Vizion>
 * );
 */

export default Panel;
