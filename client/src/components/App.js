import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Stories from './Stories';
import AddStory from './AddStory';
import UserProfile from './UserProfile';



const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <div>
          <Route path="/" exact component={Stories} />
          <Route path="/add-story" component={AddStory} />
          <Route path="/your-profile" component={UserProfile} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
