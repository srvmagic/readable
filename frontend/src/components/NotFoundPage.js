
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Button,Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";


class NotFoundPage extends Component{
	render() {
		return (
			<div>
			<HeaderBar />			
			<Container textAlign="left">
            <div className="w3-card-4">
            <Header as="h3" dividing color="red" textAlign="center">
              Page Not found
            </Header>
			</div>
			</Container>
			</div>
		)
	}
}
export default NotFoundPage;