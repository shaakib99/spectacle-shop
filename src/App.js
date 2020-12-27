import Home from './pages/Home'
import Browse from './pages/Browse'
import Details from './pages/Details'
import Information from './pages/Information'
import Ordercomplete from './pages/Ordercomplete'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import CartReducer from './redux/reducers/CartReducer'
import Notfound from './components/Notfound'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
function App() {
  const store = createStore(CartReducer)
  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/'} exact component={Home}/>
          <Route path='/browse' exact component={Browse}/>
          <Route path='/product/:productid' exact component={Details}/>
          <Route path='/information/' exact component={Information}/>
          <Route path='/order-complete/:tranid' exact component={Ordercomplete}/>
          <Route component={Notfound}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
