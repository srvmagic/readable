import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './Main';
import * as categoriesActions from '../actions/categoriesActions';
import * as postActions from  '../actions/postActions';
import * as commentActions from  '../actions/commentActions';

function mapDispachToProps(dispatch) {
  
  return {
    actions: {
      categoriesActions: bindActionCreators(categoriesActions, dispatch),
      postActions: bindActionCreators(postActions, dispatch),
      commentActions: bindActionCreators(commentActions, dispatch),
      
    }
  };
}

const App = connect(null, mapDispachToProps)(Main);

export default App;