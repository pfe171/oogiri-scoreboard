/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { slide as Menu } from "react-burger-menu";
import { FaGithub, FaListOl } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "24px",
    height: "20px",
    top: "15px",
    right: "15px",
  },
  bmBurgerBars: {
    background: "#ffffff",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#ffffff",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

function Header() {
  return (
    <div
      css={css({
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "slateblue",
        height: "50px",
        width: "100%",
        padding: "0px 10px",
        zIndex: "100",
      })}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          color: "white",
          fontSize: "x-large",
          fontWeight: "bold",
          textDecoration: "none",
        })}
      >
        大喜利スコアボード
      </div>
      <Menu styles={styles} right>
        <a
          href="/"
          style={{
            display: "block",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <FaListOl css={css({ marginRight: "5px", verticalAlign: "-3px" })} />
          メインページ
        </a>
        <a
          href="/players"
          style={{ display: "block", color: "white", marginBottom: "20px" }}
        >
          <IoPeople css={css({ marginRight: "5px", verticalAlign: "-3px" })} />
          選手編集
        </a>
        <a
          href="https://github.com/pfe171/oogiri-scoreboard"
          target="_blank"
          style={{ display: "block", color: "white", marginBottom: "20px" }}
        >
          <FaGithub
            css={css({ marginRight: "5px", verticalAlign: "-3px" })}
            target="_blank"
          />
          Githubリポジトリ
        </a>
      </Menu>
    </div>
  );
}

export default Header;
