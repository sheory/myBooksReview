import './App.css';
import React, {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [title, setTitle] = useState(""); //when the input will be string use ""
  const [author, setAuthor] = useState("");
  const [release_year, setReleaseYear] = useState(0); //when the input will be a number use 0
  const [evaluation, setEvaluation] = useState("");

  const [newEvaluation, setNewEvaluation] = useState("")

  const [bookList, setBookList] = useState([]);

  const addBook = () => {
    //using axios we are sending the values to the backend
    Axios.post('http://localhost:3001/add', {
      title: title,
      author: author,
      release_year: release_year,
      evaluation: evaluation
    }).then(() => {
      setBookList([ //to show automatically a new employee
         ...bookList,
        {
          title: title,
          author: author,
          release_year: release_year,
          evaluation: evaluation
        },
      ]);
    });
  };

  const getBook = () => {
    Axios.get('http://localhost:3001/books').then((response) => {
      setBookList(response.data);  //receiving data from the backend
    });
  };

  const updateBook = (id) => {
    Axios.put('http://localhost:3001/update', {evaluation: newEvaluation, id: id}).then((response) => {
      setBookList(bookList.map((val) => {
        return val.id == id ? {
          id: val.id,
          title: val.title,
          author: val.author,
          release_year: val.release_year,
          evaluation: newEvaluation
        } : val;
      }))
    });
  }

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
      setBookList(bookList.filter((val)=> {
        return val.id !== id;
      }));
    })
  }

  return (
    <div className="App ">
      <h3 className="title">•My books review•</h3>
      <div className="form-container">
        <h5 className="">Add a new book review to your list</h5>
        <div className="forms input-group mb-3">
          <div className="form first" >
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
            </div>
            <input className="form-control" type="text" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(event) => {
              setTitle(event.target.value); //setName 'll receive a new value in every change at the input
            }}/>
          </div>
          <div className="form">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Author</span>
            </div>
            <input className="form-control" type="text" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(event) => {
              setAuthor(event.target.value);
            }}/>
          </div>
          <div className="form">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Release year</span>
            </div>
            <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="number" onChange={(event) => {
              setReleaseYear(event.target.value);
            }}/>
          </div>
          <div className="form last" >
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Evaluation</span>
            </div>
            <input className="form-control evaluation" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" onChange={(event) => {
              setEvaluation(event.target.value);
            }}/>
          </div>
          <button className="add-book" onClick={addBook}>ADD BOOK</button>
          <button className="showReviews" onClick={getBook}>SHOW REVIEWS</button>

        </div>
      </div>
      <div className="list-container">
        <div className="books">
          <h5>Books Review</h5>
          {bookList.map((val, key) => {
            return (
               <div className="showBooks">
                 <div>
                   <p>Title:  {val.title}</p>
                   <p>Author:  {val.author}</p>
                   <p>Release year: {val.release_year}</p>
                   <p>Evaluation: {val.evaluation}</p>
                 </div>
                 <div className="list-option">
                   <input className="list" type="text" placeholder="edit your review..." onChange={(event) => {
                     setNewEvaluation(event.target.value);
                   }}/>
                   <button className="update" onClick={() =>updateBook(val.id)}
                   >
                     {" "}
                     Update
                   </button>

                   <button className="delete" onClick={() => deleteBook(val.id)}> Delete </button>
                 </div>
               </div>
            );
          })}
        </div>
      </div>

      </div>
  );
}

export default App;
