import React, { Component } from 'react'

import Book from './Book'
import { Link } from 'react-router-dom'
 import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        searchTerm: [],
        booksSearch: []
    }


    search = (query) => {

        query.length > 0 && BooksAPI.search(query)
        .then((books) => {
          //const inShelf = books.length > 0 && this.props.booksInShelf.filter(book => books.entries().include(book.id));
          //console.log('In Shelf', inShelf);
          this.setState(() => ({
            searchTerm: query,
            booksSearch: books.filter(book => book.id === "KXcf22HQlGkC")
          }))
    
        })
    
      }
    

    render() {
        const { onUpdate } = this.props;
        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" >
                    <button className="close-search">Close</button>
                </Link>                
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.search(event.target.value)}/>
                <ol className="books-grid">
                      {(this.state.booksSearch && this.state.booksSearch.length > 0) && (
                          this.state.booksSearch.map(book => {
                              return <Book key={book.id} book={book} onUpdate={onUpdate}/>
                          })
                      )}
                </ol>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

export default Search
