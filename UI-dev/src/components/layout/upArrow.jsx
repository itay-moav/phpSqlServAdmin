import React, { Component } from "react";

class UpArrow extends Component {
  state = {
    display: "none"
  };

  componentDidMount() {
    window.onscroll = () => {
      const display = window.pageYOffset > 100 ? "block" : "none";
      this.setState({ display });
    };
  }

  render() {
    return (
      <i
        onClick={() => {
          window.scroll(0, 0);
        }}
        className="fa fa-chevron-up fa-3x"
        style={{
          display: this.state.display,
          bottom: "50px",
          height: "50px",
          position: "fixed",
          right: "50px",
          width: "50px",
          cursor: "pointer",
          color: "#013e7e"
        }}
      />
    );
  }
}

export default UpArrow;
