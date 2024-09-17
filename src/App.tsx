/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from "./Header"
import Table from "./Table"

function App() {
  return (
    <>
      <Header />
      <div css={css({
        marginTop: '10px'
      })}>
        <Table />
      </div>
    </>
  )
}

export default App
