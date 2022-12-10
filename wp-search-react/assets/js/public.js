import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/searchForm';

class WPPost extends React.Component {
  constructor(props){
    super(props); 
     
  } 
  render() {
    return (
      <article>
      <h2 dangerouslySetInnerHTML={{__html: this.props.post.title.rendered}}></h2>
      <p dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}}></p>
        <a target="_blank" href={this.props.post.link}>Read More</a>
       </article>
    )
  }
}
class WPSitePosts extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let posts = '';
    if( this.props.posts.length == 0 ) {
      posts = <p>Nothing to See</p>;
    } else {
      posts = this.props.posts.map( (post, i) => {
        return(
         <WPPost key={i} post={post}/>
        )
      });
    }
    return (
      <div>
      {posts}
      </div>
    )
  }
}
class WPSitesSelector extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.getPostsOnChange(e.target.value);
  }
  render() {
    const data = [
      {
        url: 0,
        title: 'Select a Site'
      },
      {
        url: 'https://tommcfarlin.com/wp-json/wp/v2/posts',
        title: 'TomMcFarlin.com'
      },
      {
        url: 'https://carlalexander.ca/wp-json/wp/v2/posts',
        title: 'CarlAlexander.com'
      },
      {
        url: 'https://pippinsplugins.com/wp-json/wp/v2/posts',
        title: 'PippinsPlugins.com'
      },
      {
        url: 'https://wesbos.com/wp-json/wp/v2/posts',
        title: 'WesBos.com'
      },
      {
        url: 'https://growdevelopment.com/wp-json/wp/v2/posts',
        title: 'GrowDevelopment.com'
      },
       {
        url: 'https://ibenic.com/wp-json/wp/v2/posts',
        title: 'Ibenic.com'
      },
    ];
     
    const links = data.map( ( link, index ) => {
      return (
      <option key={index} value={link.url}>
        {link.title}
      </option>)
    });
   
    return (
      <select onChange={this.handleChange}>
      {links}
      </select>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = {posts : []};
  }
  getPosts(url) {
     
    if( url !== '0' ) {
      let json = fetch(url)
      .then(response => { return response.json()})
      .then(posts => {this.setState({posts: posts})});
    } else {
      this.setState({posts: []});
    }
  }
  render() {
    return (
     <div>
        <WPSitesSelector getPostsOnChange={this.getPosts}/>
        <WPSitePosts posts={this.state.posts} />
     </div>
    )
  }
}


const element = <App />

const appElement = document.getElementById('react_rest_api');

if( appElement ) {
  ReactDOM.render(
    element,
    document.getElementById('react_rest_api')
  );
}
const searchFormElement  = <SearchForm />;
const searchFields = document.getElementsByClassName('search-form');
 
if( searchFields.length ) {

  for( let i=0; i < searchFields.length; i++ ) {
    console.log( searchFields[ i ]);
    ReactDOM.render(
      searchFormElement,
      searchFields[ i ]
    );
  }
}
