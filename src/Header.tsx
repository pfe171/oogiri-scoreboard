/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Header() {
  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'slateblue',
        height: '50px',
        padding: '0px 10px',
      })}
    >
      <div css={css({
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontSize: 'x-large',
        fontWeight: 'bold',
        textDecoration: 'none',
      })}>
        大喜利スコアボード
      </div>
    </div>
  )
};

export default Header
