import React from 'react';
import { connectCurrentRefinements } from '@clinia/react-vizion-core';
import PanelCallbackHandler from '../components/PanelCallbackHandler';
import ClearRefinements from '../components/ClearRefinements';

/**
 * The ClearRefinements widget displays a button that lets the user clean every refinement applied
 * to the search.
 * @name ClearRefinements
 * @kind widget
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {boolean} [clearsQuery=false] - Pass true to also clear the search query
 * @themeKey cvi-clearrefinements - the root div of the widget
 * @themeKey cvi-clearrefinements-button - the clickable button
 * @themeKey cvi-clearrefinements-button--disabled - the disabled clickable button
 * @translationKey reset - the clear all button value
 * @example
 * import React from 'react';
 * import clinia from 'clinia/lite';
 * import { Vizion, ClearRefinements, RefinementList } from '@clinia/react-vizion-dom';
 *
 * const searchClient = clinia(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 * const App = () => (
 *   <Vizion
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <ClearRefinements />
 *     <RefinementList
 *       property="type"
 *       defaultRefinement={['Pharmacy']}
 *     />
 *   </Vizion>
 * );
 */

const ClearRefinementsWidget = props => (
  <PanelCallbackHandler {...props}>
    <ClearRefinements {...props} />
  </PanelCallbackHandler>
);

export default connectCurrentRefinements(ClearRefinementsWidget);
