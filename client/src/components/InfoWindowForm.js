import React, { useState } from "react";
import { Switch } from "@mui/material";
import Input from "./UI/Input";
import { useNavigate } from "react-router-dom";
import LocationRating from "../components/LocationRating";

const InfoWindowForm = ({
  addDescription,
  setAddDescription,
  info,
  user,
  vaildateUsersPin,
  isPublic,
  setIsPublic,
  handlePublicSwitch,
  deleteMarker,
  state,
  setState,
  editMarker,
  setPoints,
}) => {
  const [error, setError] = useState("");
  const rating = info.rating / info.numberofratings;
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (state.title && state.description && state.tags) {
      editMarker(state.title, state.description, info.id, state.tags);
    } else {
      setError("Missing Field");
    }
  };

  const handleFullDetails = (id) => {
    navigate(`/full-details`, { state: { id } });
  };

  return (
    <div>
      {!addDescription && (
        <div>
          <LocationRating
            rating={rating}
            id={info.id}
            point={info}
            setPoints={setPoints}
          />
          <h2>{!info.title ? "Your new pin!" : info.title} </h2>
          <p>Created {new Date(info.time).toDateString()}</p>
          {info.description && <p>{info.description}</p>}
          <span style={{ display: "flex", flexDirection: "column" }}>
            <div
              onClick={() => handleFullDetails(info.id)}
              style={{ marginBottom: "5px" }}
            >
              Full Details
            </div>
            {vaildateUsersPin(user, info) && (
              <button
                onClick={() =>
                  setAddDescription(true) && setIsPublic(info.ispublic)
                }
              >
                Edit Details
              </button>
            )}
          </span>
        </div>
      )}
      {addDescription && (
        <div className="inputs">
          <span className="switch">
            <h3>{`Set ${isPublic ? "Private" : "Public"} `}</h3>
            <Switch
              size="small"
              onClick={() => handlePublicSwitch(info)}
              checked={isPublic}
              color={isPublic ? "warning" : "default"}
            />
          </span>
          <h3>Title</h3>

          <Input
            value={state.title}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                title: e,
              }));
            }}
            placeholder={"Title"}
            required={true}
          />
          <h3>Description</h3>
          <Input
            value={state.description}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                description: e,
              }))
            }
            placeholder={"Description"}
            required={true}
          />
          <h3>Tags</h3>
          <Input
            value={state.tags}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                tags: e,
              }))
            }
            placeholder={"Add Tags"}
            required={true}
          />
          <div className="edit-delete">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => deleteMarker(info.id)}>Delete</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};
export default InfoWindowForm;
