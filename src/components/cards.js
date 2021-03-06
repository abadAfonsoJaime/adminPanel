import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCards } from "../services/fakeCardService";

import CardsTable from "./cardsTable";
// import Simulator from "./simulator";
import PhoneSimulator from "./phoneSimulator";
import CardSimulator from "./cardSimulator";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Cards extends Component {
  state = {
    cards: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "publishDate", order: "asc" },
    simulator: {
      display: false,
      title: "",
      description: "",
      buttonText: ""
    }
  };

  async componentDidMount() {
    const cards = await getCards();
    this.setState({ cards });
  }

  handleDelete = cardToDelete => {
    //alert(`¿Quieres borrar la tarjeta: ${cardToDelete.title}?`);
    const cards = this.state.cards.filter(c => c._id !== cardToDelete._id);
    this.setState({ cards });
  };

  handleVisibility = clickedCard => {
    let cards = [...this.state.cards];
    const index = cards.indexOf(clickedCard);
    cards[index] = { ...cards[index] };
    cards[index].isVisible = !cards[index].isVisible;
    // call the server to persist the changes
    this.setState({ cards });
    // console.log("Eye clicked", card);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // handleSort = sortColumn => {
  //   this.setState({ sortColumn });
  // };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  updateDataSubset = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      cards: AllCards
    } = this.state;
    let filtered = AllCards;
    if (searchQuery)
      filtered = AllCards.filter(c =>
        c.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
    const cards = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, cards };
  };

  handleSimulator = card => {
    const { title, description, buttonText } = card;
    const simulator = { ...this.state.simulator };
    simulator.title = title;
    simulator.description = description;
    simulator.buttonText = buttonText;
    simulator.display = true;
    this.setState({ simulator });
    console.log(" display it --> ", simulator);
  };

  render() {
    const { totalCount, cards } = this.updateDataSubset();
    //if (totalCount === 0) return <p> No hay campañas en la base de datos. </p>;

    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      simulator
    } = this.state;

    return (
      <>
        <div className="row justify-content-around align-items-center mb-4">
          <div className="col-sm-4 d-flex justify-content-center">
            <Link
              to="/cards/new"
              className="btn"
              //style={{ backgroundColor: "#4f87ce" }}
              style={{ backgroundColor: "#61c8ec", fontWeight: "bold" }}
            >
              Nueva Campaña
            </Link>
          </div>
          <div className="col-sm-6">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <h5>Se encontraron {totalCount} campañas en la base de datos.</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <CardsTable
              cards={cards}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onVisibility={this.handleVisibility}
              //onSort={this.handleSort}
              onPreview={this.handleSimulator}
            />
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              itemsCount={totalCount}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        <div className="row  justify-content-center">
          <div className="col-auto">
            <PhoneSimulator>
              {simulator.display && (
                <CardSimulator
                  title={simulator.title}
                  description={simulator.description}
                  buttonText={simulator.buttonText}
                />
              )}
            </PhoneSimulator>
          </div>
        </div>
      </>
    );
  }
}

export default Cards;
