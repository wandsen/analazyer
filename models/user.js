var sha256 = require('js-sha256');
const request = require('request');
const rp = require('request-promise');

var SALT = 'HarryPotter';


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {

    const checkusername = (user, callback) => {

          let currentuser = user
          console.log("current user", user)
          // set up query
          const queryString = 'SELECT username FROM users';


          // execute query
          dbPoolInstance.query(queryString, (error, queryResult) => {
            console.log('check username result', queryResult.rows)

            let checkresult = false;

            queryResult.rows.forEach((element)=>{
                console.log('executing function')

                if (currentuser === element.username){
                    checkresult = true;
                    console.log('there is an existing username')

                }

            });

            if (checkresult === false){
                callback(error , request.body)
            }


          });
    };


    const authentication = (user, callback)=>{
        let hashedValue = sha256(user.password);

        const queryString = 'SELECT * FROM users';

      dbPoolInstance.query(queryString, (error, queryResult) => {

        let authenticationResult;

        queryResult.rows.forEach((element)=>{
            if (user.name === element.username){

                if(hashedValue === element.password){
                    console.log("this is the correct user and password")
                    authenticationResult = true;

                }else{
                    console.log("this is the wrong password")
                }


            }else{
                    console.log("there is no such username")
            }

      });
        if(authenticationResult === true){
            let loginValue = sha256(SALT + user.password)
            console.log("cookie loginvalue: ", loginValue)
            callback(error, queryResult, loginValue)
        }

    });
    };


    const create = (user, callback) => {

          var hashedValue = sha256(user.password);

          // set up query
          const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
          const values = [
            user.username,
            hashedValue
          ];

          // execute query
          dbPoolInstance.query(queryString, values, (error, queryResult) => {
            // invoke callback function with results after query has executed
            console.log("added username")
            callback(error, queryResult);
          });
        // });
    };





    const getIndexData =(callback)=>{

    request('https://financialmodelingprep.com/api/majors-indexes', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

        let string = res.body
        let slicestring = string.slice(5, -5)


        // console.log(res.body)
        callback("error", JSON.parse(slicestring))

    });
    }

    const incomeStatement2 =(stockname, callback)=>{

    request('https://financialmodelingprep.com/api/financials/income-statement/'+'AAPL', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

        let string = res.body
        let slicestring = string.slice(5, -5)


        //JSON.parse(slicestring) is an object
        // callback("error", JSON.parse(slicestring))
        return JSON.parse(slicestring)

    });
    }


    const balanceSheet2 =(stockname, callback)=>{

    request('https://financialmodelingprep.com/api/financials/balance-sheet-statement/'+'AAPL', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

        let string = res.body
        let slicestring = string.slice(5, -5)



        //JSON.parse(slicestring) is an object
        // callback("error", JSON.parse(slicestring))
        return JSON.parse(slicestring)

    });
    }


    //this function returns an object that contains cashflow data
    const cashFlowStatement = async(stockname) => {
        let request = {
            uri: 'https://financialmodelingprep.com/api/financials/cash-flow-statement/'+stockname
        }

        try {
            var preOutput = await rp(request)
            var output = preOutput.slice(5, -5)

        }catch(error) {
            return error;

        }


    return JSON.parse(output)
    }


    //this function returns an object that contains cashflow data
    const incomeStatement = async(stockname) => {
        let request = {
            uri: 'https://financialmodelingprep.com/api/financials/income-statement/'+ stockname
        }

        try {
            var preOutput = await rp(request)
            var output = preOutput.slice(5, -5)

        }catch(error) {
            return error;

        }


    return JSON.parse(output)
    }

    //this function returns an object that contains cashflow data
    const balanceSheet = async(stockname) => {
        let request = {
            uri: 'https://financialmodelingprep.com/api/financials/balance-sheet-statement/'+stockname
        }

        try {
            var preOutput = await rp(request)
            var output = preOutput.slice(5, -5)

        }catch(error) {
            return error;

        }


    return JSON.parse(output)
    }

    //this function returns an object that contains current price data
    const currentPrice = async(stockname) => {
        let request = {
            uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stockname+'&outputsize=compact&apikey=KKTLO8DUTHHVG5S1'
        }

        try {
            var output = await rp(request)

        }catch(error) {
            return error;

        }


    return JSON.parse(output)
    }

    // const currentPriceOld = (stockname, callback)=>{

    // request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stockname+'&outputsize=compact&apikey=KKTLO8DUTHHVG5S1', { json: true }, (err, res, body) => {
    // if (err) { return console.log(err); }

    // // console.log(res.body);

    // //res.body is the stock data in object form
    // callback("error", res.body)
    // return res.body

    // });
    // }


    const updatedatabase = (stockname, jsonfile) =>{

        console.log("running update database")

        const queryString = 'SELECT * FROM financialreport WHERE name = $1';

        const values = [stockname]

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                console.log('ERR:', error);
                // return;
            }

            console.log("update database", queryResult.rows)


            // console.log(queryResult.rowcount)
            if (queryResult.rows.length >= 1){
                console.log("updating financialreport database" , queryResult.rows.length )


                //change update database
                const query = 'UPDATE financialreport SET data = $1     WHERE name = $2'
                const values = [jsonfile, stockname]

                dbPoolInstance.query(query, values, (error, queryResult) => {


                    //call new function


                })


            }else{
                console.log('creating new entry in financialreport database')

                const query = 'INSERT INTO financialreport (name, data) VALUES ($1, $2)';
                const values = [stockname, jsonfile]

                dbPoolInstance.query(query, values, (error, queryResult) => {

                    //call new function
                })

            }


        });

    }



    //this function returns an object with annual report data
    const financialStatement =async(stockname, callback)=>{

        let combinedAR = {};

        combinedAR['incomeStatement'] = await incomeStatement(stockname)

        combinedAR['balanceSheet'] = await balanceSheet(stockname)

        combinedAR['cashFlowStatement'] = await cashFlowStatement(stockname)

        combinedAR['currentPrice'] = await currentPrice(stockname)

        combinedAR.name = stockname

        console.log("financial statement" , JSON.stringify(combinedAR))

        //update database when call is made
        updatedatabase(stockname, JSON.stringify(combinedAR))



        callback("error", combinedAR)

    };

    const addstock = (user, callback) => {

          const queryString = 'INSERT INTO followstock (username, stockname) VALUES ($1, $2)';
          const values = [
            user.username,
            user.stockname
          ];

          dbPoolInstance.query(queryString, values, (error, queryResult) => {
            console.log("added stock")
            callback(error, queryResult);
          });
    };


    // const watchlistdata =async(stockname)=>{

    //     let combinedAR = {};

    //     combinedAR['incomeStatement'] = await incomeStatement(stockname)

    //     combinedAR['balanceSheet'] = await balanceSheet(stockname)

    //     combinedAR['cashFlowStatement'] = await cashFlowStatement(stockname)

    //     // combinedAR['currentPrice'] = await currentPrice(stockname)

    //     combinedAR.name = stockname

    //     return combinedAR

    // };


    const watchlistdata = (stockname)=>{

        const queryString = 'SELECT data FROM financialreport WHERE name = $1';

        const values = [stockname]

        return dbPoolInstance.query(queryString, values,  (error, queryResult) => {

            console.log("watchlistdata", queryResult.rows)

            return queryResult

        });

    };



    const watchlist = (user, callback) => {

            console.log("username in watchlist" , user)

          const queryString = 'SELECT * FROM followstock WHERE username = $1';

          const values = [user]


          dbPoolInstance.query(queryString, values,  async(error, queryResult) => {
            console.log("watchlist" , queryResult.rows)

            console.log('WLD:',watchlistdata)

            let currentstock = queryResult.rows[0]['stockname']

            let data = await watchlistdata(currentstock)

            console.log('currentstock ' , currentstock)
            console.log("data" , data)


            //loop through names of watchlist and generate all the date from api through another function

            // let combinedwatchlist = {};

            //     queryResult.rows.forEach(async(element)=>{
            //         let currentstock = element.stockname

            //     combinedwatchlist = await watchlistdata(currentstock)

            //     console.log("combined watch list" , combinedwatchlist)



            // // callback(error, queryResult);
            // });


        });
    };




    return {
        checkusername,
        authentication,
        currentPrice,
        getIndexData,
        incomeStatement,
        balanceSheet,
        cashFlowStatement,
        financialStatement,
        create,
        addstock,
        watchlist,
        watchlistdata


    };
};


