import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Stories from './Stories';
import AddStory from './AddStory';
import UserProfile from './UserProfile';
import Story from './Story';
import Author from './Author';
import EditStory from './EditStory';
import AllSnippets from './AllSnippets';
import Payment from './Payment';





const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div>
          <Route path="/" exact component={Stories} />
          <Route path="/stories/:page" component={Stories} />
          <Route path="/add-story" component={AddStory} />
          <Route path="/edit-story/:storyId" component={EditStory} />
          <Route path="/story/:storyId" component={Story} />
          <Route path="/author/:authorId" exact component={Author} />
          <Route path="/author/:authorId/:page" component={Author} />
          <Route path="/your-profile/:page" exact component={UserProfile} />
          <Route path="/your-profile" exact component={UserProfile} />
          <Route path="/snippets/:page" exact component={AllSnippets} />
          <Route path="/payment/" exact component={Payment} />
          <Route path="/payment/:authorId" component={Payment} />


        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
