var React = require("react");

var Default = require("../Default");

class NewUser extends React.Component {
  render() {
    return (
      <Default>

        <div>
        <h1> Register </h1>
            <form method="POST" action="/users/create">
              <input type="text" name="username" placeholder="username"/>
              <input type="text" name="password" placeholder="********"/>
              <input type="submit" value="submit"/>
            </form>
        </div>

      </Default>
    );
  }
}

module.exports = NewUser;