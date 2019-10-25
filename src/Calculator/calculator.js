import React from "react"
import "./calculator.css"

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      space: "",
      calculations: 0,
      first: 0,
      second: 0,
      answer: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.back = this.back.bind(this)
    this.clear = this.clear.bind(this)
    this.calculate = this.calculate.bind(this)
    this.looseJsonParse = this.looseJsonParse.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener(
      "keydown", this.handleKeyPress
    )
  }

  componentWillUnmount() {
    document.removeEventListener(
      "keydown", this.handleKeyPress
    )
  }
  handleClick(e) {
    this.setState({
      space: this.state.space + e.target.value
    })
  }

  back() {
    this.setState({ space: this.state.space.slice(0, this.state.space.length - 1) })
  }

  clear() {
    this.setState({
      space: "",
      answer: 0
    })
  }

  looseJsonParse(obj) {
    return Function('return (' + obj + ')')();

  }

  calculate() {
    let space = this.state.space
    try {
      this.setState({ answer: this.looseJsonParse(space) })
    }
    catch (err) {
      console.log("matherror")
    }
  }

  handleKeyPress(e) {
    let keys = e.key
    if (e.keyCode === 96) {
      if (this.state.space) {
        this.setState({ space: this.state.space + keys })
      }
    }
    else if ((e.keyCode > 96 && e.keyCode < 106) ||
      (e.keyCode === 107) ||
      (e.keyCode === 109) ||
      e.keyCode === 111 ||
      e.keyCode === 106
      || e.keyCode === 189
      || e.keyCode === 56
      || e.keyCode === 191
      || e.keyCode === 190
    ) {
      this.setState({ space: this.state.space + keys })
    }
    else if (e.keyCode === 8) {
      this.back()
    }
    else if (e.keyCode === 17) {
      this.clear()
    }
    else if (e.keyCode === 13 || e.keyCode === 187) {
      this.calculate()
    }
  }

  render() {
    return (
      <div className="Main">

        <div className="Calcspace">
          <h2 className="space" align="right"> &nbsp;{this.state.space} </h2>
          <h2 className="space" align="right"> &nbsp;{this.state.answer}</h2>
        </div>
        <div className="mainBody">
          <div className="grid">
            <button key="clear" onClick={this.clear} value={"clear"} className="Number  grids">Clear</button>
            <button key="back" onClick={this.back} value={"back"} className="Number">Back</button>
            <button key="/" onClick={this.handleClick} value={"/"} className="symbols">/</button>
          </div>

          <div className="grid">
            <button key="7" onClick={this.handleClick} value={7} className="Number">7</button>
            <button key="8" onClick={this.handleClick} value={8} className="Number">8</button>
            <button key="9" onClick={this.handleClick} value={9} className="Number">9</button>
            <button key="+" onClick={this.handleClick} value={"+"} className="symbols">+</button>
          </div>

          <div className="grid">
            <button key="4" onClick={this.handleClick} value={4} className="Number">4</button>
            <button key="5" onClick={this.handleClick} value={5} className="Number">5</button>
            <button key="6" onClick={this.handleClick} value={6} className="Number">6</button>
            <button key="-" onClick={this.handleClick} value={"-"} className="symbols">-</button>
          </div>

          <div className="grid">
            <button key="1" onClick={this.handleClick} value={1} className="Number">1</button>
            <button key="2" onClick={this.handleClick} value={2} className="Number">2</button>
            <button key="3" onClick={this.handleClick} value={3} className="Number">3</button>
            <button key="*" onClick={this.handleClick} value={"*"} className="symbols">*</button>
          </div>

          <div className="grid">
            <button key="%" onClick={this.handleClick} value={"%"} className="symbols">%</button>
            <button key="0" onClick={this.handleClick} value={0} className="Number">0</button>
            <button key="." onClick={this.handleClick} value={"."} className="symbols">.</button>
            <button key="=" onClick={this.calculate} value={"="} className="symbols">=</button>
          </div>
        </div>
      </div>
    )
  }
}