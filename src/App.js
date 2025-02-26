import './App.css';
import SearchQueryGenerator from './SearchQueryGenerator';

function App() {
  return (
    <div className="App">
      <div className="app-background">
        <div className="app-container">
          <SearchQueryGenerator />
          <footer className="app-footer">
            {/* <p>© 2023 DeepPlus Search Query Generator</p> */}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
