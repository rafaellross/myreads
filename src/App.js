import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    isLoaded: true,
    showSearchPage: false,
    booksSearch: [],
    searchTerm: '',
    shelves: [
      {
        id: "currentlyReading", 
        description: "Currently Reading"
    
      },
      {
        id: "wantToRead", 
        description: "Want to Read"        
      },
      {
        id: "read", 
        description: "Read"        
      }],
      books: []
  }

  onChangeShelf(book, shelf) {
    console.log({id: book}, shelf);
    
    BooksAPI.update({id: book}, shelf)
    .then((book) => {
      console.log(book)
      this.loadBooks()
    })
}

  loadBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
      
    })

  }
  componentDidMount = () => {
    this.loadBooks()        
  }
  
  search = (query) => {
    BooksAPI.search(query)    
    .then((books) => {
      console.log(books)
      this.setState(() => ({        
        searchTerm: query,
        booksSearch: (books && books.length > 0) && 
                    (books.filter(book => {
                        return !this.state.books.find(({ id }) => id === book.id)
                        
                      }))
      }))
      
    })
    
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
                              return <Book key={book.id} book={book} onChangeShelf={(book, shelf) => {this.onChangeShelf(book, shelf); this.search(this.state.searchTerm);}}/>              
                          })
                      )}
                </ol>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.state.isLoaded && (
              <div className="list-books-content">
              <div>
                {this.state.shelves.map(shelf => (
                  <Shelf key={shelf.id} shelf={shelf} books={this.state.books.filter(book => book.shelf === shelf.id)} onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}/>              
                ))}
                
              </div>
            </div>

            )}
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
