import {Page} from '../design/components.js';
import {Navigate, useLocation} from '../router.js';
import type {ConsoleDataAdapter} from './types.js';
import {BoardInspector} from './board.js';
import {SearchInspector} from './search.js';

export {SearchInspector, JsonDisclosure} from './search.js';
export {excerpt, searchGroups} from './search-model.js';

export function DiagnosticsPage({adapter}: {adapter: ConsoleDataAdapter; canInspect?: boolean}) {
  const location = useLocation(), query = new URLSearchParams(location.search);
  if (query.get('view') === 'search') return <Navigate to="/search" replace/>;
  const topic = query.get('view') === 'stream' ? '' : query.get('topic')?.trim() || '';
  const id = query.get('message') || '', parsed = /^\d+$/.test(id) ? Number(id) : NaN;
  const message = Number.isSafeInteger(parsed) && parsed > 0 && parsed < Number.MAX_SAFE_INTEGER ? parsed : undefined;
  return <Page title={topic ? '# ' + topic : 'All topics'} className="oc-conversation-page"><BoardInspector key={JSON.stringify([topic, message])} adapter={adapter} stream={!topic} topic={topic} message={message}/></Page>;
}

export function SearchPlaygroundPage({adapter}: {adapter: ConsoleDataAdapter; canInspect?: boolean}) {
  return <Page title="Search playground"><SearchInspector adapter={adapter}/></Page>;
}
