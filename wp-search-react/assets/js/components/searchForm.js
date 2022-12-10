import React from 'react';
import SearchResults from './searchResults';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.getResults = this.getResults.bind(this);
    this.state = {results : [], loading: false, searched: false};
  }
  getResults(e) {
    if( this.state.loading ) {
      return;
    }
    const search = e.target.value;
    if( search && search.length > 2 ) {
      this.setState({ loading: true, searched: true });
      let url  = wp_react_js.rest_search_posts.replace( '%s', search );
      let json = fetch(url)
      .then(response => { return response.json()})
      .then(results => {this.setState({results: results, loading:false});});
    } else {
      this.setState({results: [], searched: false });
    }
  }
  render() {
    return (
     <div className="search-form-input">
         <input className="search-input" type="text" onKeyUp={this.getResults} />
         <SearchResults searched={this.state.searched} loading={this.state.loading} results={this.state.results}/>
     </div>
    )
  }
}