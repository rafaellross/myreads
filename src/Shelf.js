import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    onChangeShelf(book, shelf) {
        
        this.props.onChangeShelf(book, shelf);
    }

    static propTypes = {

    }

    render() {
        const {shelf, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.description}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">                        
                        {books.length > 0 && (
                            books.map(book => {
                                return <Book key={book.id} book={book} onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}/>              
                            })
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf
