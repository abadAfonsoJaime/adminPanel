import React from "react";
import { Link } from "react-router-dom";
import Eye from "./common/eye";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

const CardsTable = ({
  cards,
  onDelete,
  onVisibility,
  //onSort,
  sortColumn,
  onPreview
}) => {
  const columns = [
    { path: "title", label: "Título" },
    // {
    //   path: "description",
    //   label: "Description",
    //   content: card => <Link to={`/cards/${card._id}`}>{card.description}</Link>
    // },
    { path: "buttonText", label: "Texto Botón" },
    {
      content: eachCard => (
        <a href={eachCard.landingPage} target="_blank">
          {eachCard.landingPage}
        </a>
      ),
      label: "LandingPage"
    },
    {
      label: "Visible",
      content: eachCard => (
        // <div className="d-flex justify-content-center">
        <Eye
          isVisible={eachCard.isVisible}
          onToggleVisibility={() => onVisibility(eachCard)}
        />
        // </div>
      )
    },
    {
      key: "edit",
      content: eachCard => (
        <Link
          to={`/cards/${eachCard._id}`}
          className="btn btn-warning btn-md"
          style={{ fontWeight: "bold" }}
        >
          Editar
        </Link>
      )
    },
    {
      key: "delete",
      content: eachCard => (
        <button
          onClick={() => onDelete(eachCard)}
          className="btn btn-danger btn-md"
        >
          Eliminar
        </button>
      )
    },
    {
      key: "preview",
      content: eachCard => (
        <button
          onClick={() => onPreview(eachCard)}
          className="btn btn-outline-success btn-block"
          style={{ fontWeight: "bold" }}
        >
          Vista previa
        </button>
      )
    }
  ];

  return (
    <div className="table-responsive table-hover">
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          //onSort={onSort}
        />
        <TableBody columns={columns} data={cards} itemValue="_id" />
      </table>
    </div>
  );
};

export default CardsTable;
