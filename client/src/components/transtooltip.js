import { h, Component } from 'preact';

class TransTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ showTooltip: true });
  }

  handleMouseLeave() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { text, tooltip } = this.props;
    const { showTooltip } = this.state;

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
        {text}
        </span>
        {showTooltip && (
          <div
            style="
              position: absolute;
              bottom: 110%;
              padding: 2%;
              background-color: #333333d8;
              color: #fff;
              border-radius: 5px;
              zIndex: 1;"
            >
              {tooltip}
          </div>
        )}
      </div>
    );
  }
}

export default TransTooltip;