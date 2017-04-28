import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';

import BottomNavigationExampleSimple from './BottomNavigationExampleSimple';
import TabsExampleSwipeable from './TabsExampleSwipeable';
import ListExampleSimple from './ListExampleSimple';




const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});




class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this)

    this.state = {
      	open: false,
      	openDrawer: false
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleHide () {
  	this.setState({
  		openDrawer: false
  	})
  }

  toggleDrawer () {
  	console.log('触发toggleDrawer');
  	this.setState({
  		openDrawer: !this.state.openDrawer
  	})
  }

// <h1>Material-UI谷歌</h1>
// <h2>示例</h2>
// <RaisedButton
//   label="退出"
//   secondary={true}
//   onTouchTap={this.handleTouchTap}
// />
  render() {
    const standardActions = (
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        		<AppBar 
        			title='CNODE' 
        			onLeftIconButtonTouchTap={this.toggleDrawer} 
        			onRightIconButtonTouchTap={this.handleHide}
        			onTitleTouchTap={this.handleHide}
				  />
	        	<div style={styles.container}>
			        
		          <Dialog
		            open={this.state.open}
		            title="退出"
		            actions={standardActions}
		            onRequestClose={this.handleRequestClose}
		          >
		            确认退出吗？
		          </Dialog>
			          <Drawer toggleDrawer={this.toggleDrawer}
				          	docked={this.state.openDrawer}
          					onRequestChange={this.handleHide}
				        > <ListExampleSimple />
				        </Drawer>
			          <TabsExampleSwipeable />
		      	</div>
		      	<BottomNavigationExampleSimple />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;