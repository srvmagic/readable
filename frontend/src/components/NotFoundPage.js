
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Button,Container } from "semantic-ui-react";


class NotFoundPage extends Component{
	render() {
		return (
			<Container textAlign="left">
            <div className="w3-card-4">
            <Header as="h3" dividing color="red" textAlign="center">
              Page Not found
            </Header>
				<Button><Link to="/">Back to Home</Link></Button>
			</div>
			</Container>
		)
	}
}
export default NotFoundPage;