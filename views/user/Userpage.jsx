var React = require("react");

var Default = require("../Default");


//create the <createTable> tag that takes in financial data and puts it into a table
class CreateTable extends React.Component {
  render() {

    let arrayToProcess = this.props.allstock

    //Create TopRoW (title)

    let topRow = <tr>
                    <th>Stockname</th>
                    <th>Closing Price</th>
                    <th>Target Price</th>
                  </tr>


    //creating the wholetable
    let allRowDataMap = [topRow];

    //populate each row
    for (let i = 0; i < arrayToProcess.length; i++){
    let specificStockData = arrayToProcess[i].data['currentPrice']

    let dcf = arrayToProcess[i].data['dcf']

    //process each row

    let specificStockDates = Object.keys(specificStockData['Time Series (Daily)'])
    let latestDate = specificStockDates[0]
    let latestPrice = specificStockData['Time Series (Daily)'][latestDate]['4. close']
    let stockname = specificStockData['Meta Data']['2. Symbol']

    let targetPrice = dcf[stockname].DCF

    console.log("target price", targetPrice)


    let currentRow = <tr>
                      <td>{stockname}</td>
                      <td>{latestPrice}</td>
                      <td>{targetPrice}</td>
                    </tr>

    allRowDataMap.push(currentRow);
    }







    return (
      <table>
      {allRowDataMap}
      </table>



    );
  }
}

class UserPage extends React.Component {
  render() {

    let username = this.props.username;
    console.log("userpage username: " , username)

    let watchListArray = this.props.watchlist
    console.log("userpage jsxwatchlist: " , watchListArray)


    //components of the tableview
    let currentPriceData = this.props.watchlist[0].data['currentPrice']
    let currentPriceDates = Object.keys(currentPriceData['Time Series (Daily)'])
    let latestDate = currentPriceDates[0]
    let latestPrice = currentPriceData['Time Series (Daily)'][latestDate]['4. close']

    let stockname = currentPriceData['Meta Data']['2. Symbol']



    let addStockUrl = '/' + username + '/addstock'
    return (
      <Default>

      <div class="name">
       User: {username}
      </div>
        <div>
        <h3>What stock would you like to follow</h3>
        <form method="POST" action={addStockUrl}>
          <input type="text" name="stockname" placeholder="input stock name e.g. Apple"/>
          <input type="hidden" name="username" value={username}/>
          <input type="submit" value="+"/>
        </form>

        </div>

        <div class="table">

        <CreateTable allstock = {watchListArray}></CreateTable>

        </div>





      </Default>
    );
  }
}

module.exports = UserPage;