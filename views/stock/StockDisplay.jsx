var React = require("react");
var Default = require("../Default");


//create the <createTable> tag that takes in financial data and puts it into a table
class CreateTable extends React.Component {
  render() {

    //the object to process
    let objectToProcess = this.props.chosenData

    //Getting the object array keys e.g. Revenue
    let objectToProcessArray = Object.keys(objectToProcess)


    //Getting the array of keys for top row e.g. '[2013-09, ..]'
    let topRowData = Object.keys(objectToProcess[objectToProcessArray[0]])

    //Creating the top row (title)
    let toprow = <tr><th></th>{topRowData.map((item, index) =>{
        return(<th>{item}</th>)
    })}</tr>

    //The actual array to display
    let allRowDataMap = [toprow]

   //populate each row
    for (let i = 0; i < objectToProcessArray.length; i++){

    //process 1 column
    let currentRowDataObject = objectToProcess[objectToProcessArray[i]]

    //1 column of data packaged in array
    let currentRowDataMap = []
    for (var property in currentRowDataObject){
        currentRowDataMap.push(<td>{currentRowDataObject[property]}</td>)
    }
    allRowDataMap.push(<tr><td>{objectToProcessArray[i]}</td>{currentRowDataMap}</tr>)

    }

    return (

      <table>
        <h1>{allRowDataMap}</h1>
      </table>

    );
  }
}

class StockDisplay extends React.Component {
  render() {


    let stockname = this.props.ar.name

    //string
    // console.log("current price" , this.props.ar.currentPrice['Time Series (Daily)'])


    //objects of data
    let currentPrice = this.props.ar.currentPrice['Time Series (Daily)']
    let incomeStatement = this.props.ar.incomeStatement[stockname]
    let balanceSheet = this.props.ar.balanceSheet[stockname]
    let cashFlowStatement = this.props.ar.cashFlowStatement[stockname]

    //current price display

    //currentPriceDate Array
    let currentPriceDate = Object.keys(currentPrice)
    let latestDate = currentPriceDate[0]

    let dataOfLatestDate = currentPrice[currentPriceDate[0]]

    console.log("this", dataOfLatestDate)




    //get key
    let getkey = Object.keys(dataOfLatestDate)
    console.log("array", getkey)

    let close = getkey[3]
    console.log("close", close)

    let closePrice = dataOfLatestDate
    [close]

    console.log(closePrice)


    return (
      <Default>

        <h1> Your requested Stock </h1>
        <h2> Stock name: {stockname} </h2>
        <h3> Date: {latestDate}</h3>
        <h3> Close Price: {closePrice}</h3>



        <div>
        <h2>Income Statement</h2>
        <CreateTable chosenData={incomeStatement}></CreateTable>

        <h2>Balance Sheet</h2>
        <CreateTable chosenData={balanceSheet}></CreateTable>

        </div>

      </Default>
    );
  }
}

module.exports = StockDisplay;