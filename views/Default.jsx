var React = require("react");

class Default extends React.Component {
  render() {
    let cssfile = this.props.cssFile;
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
        <title>Analazyer</title>

        </head>
        <body>

        <nav>
        nav bar
        </nav>



        {this.props.children}

        </body>
      </html>
    );
  }
}

module.exports = Default;