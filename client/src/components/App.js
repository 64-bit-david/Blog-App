import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './Header';
import ScrollToTop from './ScrollToTop';
import Stories from './Stories';
import AddStory from './AddStory';
import UserProfile from './UserProfile';
import Story from './Story';
import Author from './Author';
import EditStory from './EditStory';
import AllSnippets from './AllSnippets';
import Payment from './Payment';
import Footer from './Footer';
import Error404 from './Error404';




const App = () => {

  return (
    <div className="body-container">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="main">
          <Switch>
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
            <Route component={Error404} />
          </Switch>

        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
