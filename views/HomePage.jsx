var React = require("react");

var Default = require("./Default");

class HomePage extends React.Component {
  render() {

    let dataObject = this.props.indexData
    // console.log("homepage:", this.props.indexData['.DJI'].Name)

    let dowJonesPrice = dataObject['.DJI'].Price

    return (

      <Default>

      <div id="welcome">

        <h1 id="welcome-message">Analyse Stocks the Lazy Way</h1>

      </div>

      <div>

        <h3>What would you like to analyze</h3>
        <form method="GET" action="/stock">
          <input type="text" name="stockname" placeholder="input stock name e.g. Apple"/>
        </form>

      </div>

        <div>
          <h3> Log in </h3>
          <form className="user-form" method="POST" action="/authentication">
              username:<input name="name" type="text" />
              password:<input name="password" type="text" />
              <input name="submit" type="submit" />
          </form>
        </div>

        <a href="/register">Register</a>

        <div>

        <h3> Index </h3>
        Dow Jones {dowJonesPrice}

        </div>



      </Default>
    );
  }
}

module.exports = HomePage;