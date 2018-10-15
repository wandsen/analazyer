var React = require("react");

var Default = require("./Default");

class HomePage extends React.Component {
  render() {

    let dataObject = this.props.indexData
    // console.log("homepage:", this.props.indexData['.DJI'].Name)

    let dowJonesPrice = dataObject['.DJI'].Price
    let nasdaqPrice = dataObject['.IXIC'].Price
    let sandp500 = dataObject['.INX'].Price

    return (

      <Default>




      <div class="main-content">


            <h1 id="welcome-message">Analyse Stocks the Lazy Way</h1>


            <div id="getstock">
                <form method="GET" action="/stock">
                  <input type="text" name="stockname" placeholder="GET ANNUAL REPORT"/>
                </form>
            </div>

            <div class="login">
              <form className="user-form" method="POST" action="/authentication">
                  <input name="name" type="text" placeholder="username" />
                  <input name="password" type="text" placeholder ="*******" />
                  <input name="submit" value = "LOG IN" type="submit" />
              </form>
            </div>

            <form className="register" method="GET" action="/register">
                <input id="register-button" value="GET STARTED" name="submit" type="submit" />
            </form>


            <div class="index">
            <span>Dow Jones {dowJonesPrice}-----------</span>
            <span>Nasdaq {nasdaqPrice}------------</span>
            <span>S&P 500 {sandp500}--------------</span>
            </div>

      </div>


      </Default>
    );
  }
}

module.exports = HomePage;