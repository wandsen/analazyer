var React = require("react");

var Default = require("../Default");

class UserPage extends React.Component {
  render() {

    let username = this.props.username;
    console.log("userpage username: " , username)
    console.log("userpage watchlist: " , this.props.watchlist)


    let addStockUrl = '/' + username + '/addstock'
    return (
      <Default>

      {username}

        <div>
        <h3>What stock would you like to follow</h3>
        <form method="POST" action={addStockUrl}>
          <input type="text" name="stockname" placeholder="input stock name e.g. Apple"/>
          <input type="hidden" name="username" value={username}/>
          <input type="submit" value="+"/>
        </form>

        </div>


        <h1>Stocks i follow</h1>







      </Default>
    );
  }
}

module.exports = UserPage;