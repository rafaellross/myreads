import React, { Component } from 'react'

import Book from './Book'

class Shelf extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        const {shelf, books, onUpdate } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.description}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">                        
                        {books.length > 0 && (
                            books.map(book => {
                                return <Book key={book.id} book={book} onUpdate={onUpdate}/>              
                            })
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf
