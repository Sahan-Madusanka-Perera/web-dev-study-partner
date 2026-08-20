import type { WidgetSpec } from '../../types/content'
import {
  ClientServerWidget,
  RequestResponseWidget,
  UrlAnatomyWidget,
  WebObjectsWidget,
} from './WebWidgets'
import { SitePlannerWidget } from './PlanWidgets'
import { ColourMixerWidget, PathExplorerWidget, TableSpansWidget, TagExplorerWidget } from './HtmlWidgets'
import { BoxModelWidget, CascadeWidget, LinkStatesWidget, SelectorWidget, UnitsWidget } from './CssWidgets'
import { GetVsPostWidget, PhpFlowWidget } from './PhpWidgets'
import { HostingFlowWidget } from './HostWidgets'

export function Widget({ spec }: { spec: WidgetSpec }) {
  switch (spec.widget) {
    case 'client-server':
      return <ClientServerWidget />
    case 'request-response':
      return <RequestResponseWidget />
    case 'web-objects':
      return <WebObjectsWidget />
    case 'url-anatomy':
      return <UrlAnatomyWidget />
    case 'site-planner':
      return <SitePlannerWidget />
    case 'tag-explorer':
      return <TagExplorerWidget />
    case 'colour-mixer':
      return <ColourMixerWidget />
    case 'table-spans':
      return <TableSpansWidget />
    case 'path-explorer':
      return <PathExplorerWidget />
    case 'box-model':
      return <BoxModelWidget />
    case 'selector-lab':
      return <SelectorWidget />
    case 'cascade-lab':
      return <CascadeWidget />
    case 'units-lab':
      return <UnitsWidget />
    case 'link-states':
      return <LinkStatesWidget />
    case 'get-vs-post':
      return <GetVsPostWidget />
    case 'php-flow':
      return <PhpFlowWidget />
    case 'hosting-flow':
      return <HostingFlowWidget />
  }
}
