import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    onChangeShelf = (shelf) => {  
        this.props.onChangeShelf(this.props.book.id, shelf);
    } 

    render() {
        const { book } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("' + (book.imageLinks !== undefined  && (book.imageLinks.thumbnail)) + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.onChangeShelf(event.target.value)} value={book.shelf || "none"}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (
                        book.authors.map((author, index) => {
                            return <div key={index} className="book-authors">{author}</div>
                        })                        
                    )}                    
                </div>                
            </li>
        )
    }
}

export default Book
