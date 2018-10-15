module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    const testdisplay = (request, response) => {

        //stock requested could be e.g.AAPL
        let username = request.params.id
        console.log('request path', username)
        // console.log(stockrequested)

        // db.user.checkusername(username, (error, result)=>{

        //         // response.render('stock/StockDisplay', {stockresult:result});

        //         response.send(result)
        //     })

    };


    const userpage = (request, response) => {

        let username = request.cookies.username

        db.user.watchlist(username, (error, result) => {

            // console.log("controller userpage watchlist", result)

            response.render('user/UserPage', { username: username, watchlist: result })

        });
    };




    const addstock = (request, response) => {

        db.user.addstock(request.body, (error, result) => {


            let redirectUrl = '/user/' + request.body.username

            response.redirect(redirectUrl)
        })


    };


    const stockpage = (request, response) => {

        //stock requested could be e.g.AAPL
        let stockrequested = request.query.stockname

        console.log(stockrequested)

        db.user.financialStatement(stockrequested, (error, result) => {


            // console.log("fs" , result)
            response.render('stock/StockDisplay', { ar: result });
        })

    };

    const updateStockDatabase = (request, response) => {

        response.send('updated!');

    };

    const homepage = (request, response) => {

        var login = request.cookies['login'];

        console.log("Loading homepage")


        db.user.getIndexData((error, result) => {

            response.render('HomePage', { indexData: result });
        })


    };


    const authentication = (request, response) => {

        db.user.authentication(request.body, (error, queryResult, loginValue) => {

            let redirectUrl = '/user/' + request.body.name

            response.cookie('login', loginValue);
            response.cookie('username', request.body.name);

            response.redirect(redirectUrl);
        });


    };

    const registerForm = (request, response) => {

        response.render('user/NewUser');

    };


    const create = (request, response) => {

        db.user.checkusername(request.body.username, (error, result) => {

            console.log("going to create new account")

            console.log(request.body)

            db.user.create(request.body, (error, queryResult) => {

                console.log(queryResult)

                if (error) {
                    console.error('error getting user:', error);
                    response.sendStatus(500);
                }

                if (queryResult.rowCount >= 1) {
                    console.log('User created successfully');

                    // drop cookies to indicate user's logged in status and username
                    response.cookie('loggedIn', true);
                    response.cookie('username', request.body.username);
                } else {
                    console.log('User could not be created');
                }

                // redirect to home page after creation
                response.redirect('/');
            });
        });

    };





    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        userpage,
        addstock,
        stockpage,
        updateStockDatabase,
        homepage,
        authentication,
        testdisplay,
        registerForm,
        create

    };
};