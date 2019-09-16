import React, { Component } from "react";
import { getCards } from "../services/fakeCardService";

class Table extends Component {
  state = {
    cards: getCards()
  };
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Texto del Botón</th>
            <th>Landing Page</th>
          </tr>
        </thead>
        <tbody>
          {this.state.cards.map(eachCard => (
            <tr>
              <td>{eachCard.title}</td>
              <td>{eachCard.description}</td>
              <td>{eachCard.textButton}</td>
              <td>{eachCard.isVisible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Table;
