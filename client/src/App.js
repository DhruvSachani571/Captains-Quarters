import Navbar from './components/Navbar'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Chat from './screens/Chat';
import Registerscreen from './screens/Registerscreen';

import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';

import Inquiry from './screens/Inquiry';
import Feedback from './screens/Feedbackscreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';



/**
 *This function carries all links necessary
 */
function App(){
    
    
    return(
        <div className='App'>
            <Navbar/>
            <BrowserRouter>
                
            <Route path="/home" exact component ={Homescreen}/>
            <Route path='/book/:roomid/:fromdate/:todate'  exact component ={Bookingscreen} exact/>
            
            <Route path='/login' exact component={Loginscreen}/>
            <Route path='/register' exact component={Registerscreen}/>
            <Route path='/profile' exact component={Profilescreen}></Route>
            <Route path='/chat' exact component={Chat}></Route>
            <Route path='/inquiry' exact component={Inquiry}></Route>
            <Route path='/feedback' exact component={Feedback}></Route>
            <Route path='/admin' exact component={Adminscreen}></Route>
            <Route path='/' exact component={Landingscreen}></Route>
           

            
            
            
            
            
            </BrowserRouter>
        </div>
    );
}

export default App;