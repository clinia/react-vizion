import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';

type Hit = {
  id: string | number;
};

type HitProps = {
  hit: Hit;
};

type Props = {
  hits: Hit[];
  className?: string;
  hitComponent?: React.FunctionComponent<HitProps>;
};

const cx = createClassNames('hits');

const DefaultHitComponent: React.FC<HitProps> = props => (
  <div
    style={{
      borderBottom: '1px solid #bbb',
      paddingBottom: '5px',
      marginBottom: '5px',
      wordBreak: 'break-all',
    }}
  >
    {JSON.stringify(props).slice(0, 100)}
    ...
  </div>
);

const Hits: React.FC<Props> = ({
  hits,
  className = '',
  hitComponent: HitComponent = DefaultHitComponent,
}) => (
  <div className={classNames(cx(''), className)}>
    <ul className={cx('list')}>
      {hits.map(hit => (
        <li className={cx('item')} key={hit.id}>
          <HitComponent hit={hit} />
        </li>
      ))}
    </ul>
  </div>
);

const HitPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

Hits.propTypes = {
  hits: PropTypes.arrayOf(HitPropTypes.isRequired).isRequired,
  className: PropTypes.string,
  hitComponent: PropTypes.func,
};

export default Hits;