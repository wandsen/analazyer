module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  //Homepage

  app.get('/', users.homepage);


  // Login/Register

  app.post('/authentication', users.authentication);

  app.get('/register', users.registerForm);
  app.post('/users/create', users.create);



  // Individual userpage

  app.get('/user/*', users.userpage);
  app.post('/:id/addstock', users.addstock);





  //stock analysis page

  app.get('/stock', users.stockpage);
  app.get('/stockupdate', users.updateStockDatabase);


  //app analysis page

  app.get('/test/:id', users.testdisplay);

};