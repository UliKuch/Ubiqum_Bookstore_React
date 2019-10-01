import React from 'react';
import logoBookstore from './logo-bookstore.jpg';
import './App.css';

function FlipBox(props) {
  return (
    <div className="flip-box m-1">
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <img src={props.book.cover} alt={"Cover of " + props.book.title}/>        
        </div>
        <div className="flip-box-back">
          <h3>{props.book.title}</h3>
          <p className="m-1">{props.book.description}</p>
          <button type="button"><a data-fancybox="gallery" href={props.book.detail}>More information</a></button>
        </div>
      </div>
    </div>
  )  
}


function Filter(props) {
  return (
    <input className="form-control" type="text" onChange={props.onChange} id="search-input" placeholder="Search" aria-label="Search" />
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      booksUnfiltered: []
    };
  }
  
  componentDidMount() {
    fetch('https://api.myjson.com/bins/zyv02')
      .then(res => res.json())
      .then(data => this.setState({ 
        books: data.books,
        booksUnfiltered: data.books, 
      }))    
  }


  handleChange(inp) {
    // handle key up w/o input
    if (!inp) {
      return;
    }
    const booksUnfiltered = this.state.booksUnfiltered.slice();
    const filteredBooks = booksUnfiltered.filter(book => {
      // counter to determine if search term is included in any property of book
      let c = 0;

      for (let prop in book) {
        if (Object.prototype.hasOwnProperty.call(book, prop)) {
          if (book[prop].toLowerCase().includes(inp.target.value.toLowerCase())) {
            c++;
            break
          }
        }
      }
      return c > 0;
    });
    this.setState({
      books: filteredBooks,
    })
  }
  
  render() {
    const books = this.state.books;
    
    return (
      <div>
        <RenderHeader onChange={(inp) => this.handleChange(inp)}/>
        <main>
          <div className= "flex-row-wrap m-5" id="flip-box-container">
            {
              books.map((book) => {
                return <FlipBox 
                  book={book}
                  key={book.title}
                />
              })
            }               
          </div>
        </main>
      </div>
    );
  }
}

function RenderHeader(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom">
        <div className="container">
          <div className="ml-3 d-flex align-items-center height-70">
            <img src={logoBookstore} className="img-fluid h-100" alt="TGIF Logo" />
          </div>
          <div className="width-400">
            <Filter onChange={props.onChange}/>
          </div>
        </div>
      </nav>
    </header>
  )
}


export default App;
