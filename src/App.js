import React from 'react'

import './App.css'

import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import { Link, Route } from 'react-router-dom'

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

  
  render() {
    console.log(this)
    return (
      <div className="app">
          <Route exact path="/search" render={() => (
            <Search onUpdate={this.loadBooks} booksInShelf={this.state.books}/>
          )}/>
          <Route exact path="/" render={() => (
              <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {this.state.isLoaded && (
                <div className="list-books-content">
                <div>
                  {this.state.shelves.map(shelf => (
                    <Shelf key={shelf.id} shelf={shelf} books={this.state.books.filter(book => book.shelf === shelf.id)} onUpdate={this.loadBooks}/>
                  ))}

                </div>
              </div>

              )}
              <div className="open-search">
                <Link to="/search" >
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}/>

      </div>
    )
  }
}

export default BooksApp
