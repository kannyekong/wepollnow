import { useState, useRef } from "react";
import Nav from "../../Layout/Landing/mainNav";
import Badge from "../../../UI/Badge";
import vice from "../../../images/vice_candidate_apc.png";
import partyLogo from "../../../images/apc.png";
import candidate from "../../../images/candidate_apc.png";
import Footer from "../../Layout/Landing/Footer";
import { Modal } from "@mui/material";
import cautionIcon from "../../../images/errorImg.png";
import close from "../../../images/CloseButton.png";
import { useHistory } from "react-router-dom";

//
const Parties = [
  {
    id: "All Progressive Congress (APC)",
    partyLogo: partyLogo,
    candidateImg: candidate,
    cBadge: "Candidate",
    vBadge: "Running Mate",
    viceCandidateImg: vice,
    partyName: "All Progressive Congress (APC)",
    candidate: "Bola Ahmed Tinubu",
    runningMate: "Kashim S.",
  },
  {
    id: "Labour Party (LP)",
    partyLogo: partyLogo,
    candidateImg: candidate,
    viceCandidateImg: vice,
    cBadge: "Candidate",
    vBadge: "Running Mate",
    partyName: "Labour Party (LP)",
    candidate: "Peter Obi",
    runningMate: "Datti",
  },
  {
    id: "Peoples Democratic Party (PDP)",
    partyLogo: partyLogo,
    candidateImg: candidate,
    viceCandidateImg: vice,
    cBadge: "Candidate",
    vBadge: "Running Mate",
    partyName: "Peoples Democratic Party (PDP)",
    candidate: "Atiku Abubakar",
    runningMate: "Ifeanyi Okowa",
  },
];
// Getting phone number from local storage
const phone = localStorage.getItem("phoneNumber");

const FormFive = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [castedVote, setCastedVote] = useState("");
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setErrorMessage] = useState(false);

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const checkHandler = (e) => {
    const vote = e.target.value;
    setCastedVote(vote);
  };

  // SEND DATA TO API
  const sendToAPI = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://pollit-test-default-rtdb.firebaseio.com/votes.json",
        {
          method: "POST",
          body: JSON.stringify({
            phone: phone,
            castedVote: castedVote,
          }),
        }
      );

      // redirect or throw error
      if (response.ok) {
        history.push("/vote/vote-form-next", { replace: true });
      } else {
        throw new Error("A problem Occured");
      }

      // catch error
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message);
    }
  };

  //   Search Functionality
  const keys = ["partyName", "candidate", "runningMate"];
  const search = (data) =>
    data.filter((data) =>
      keys.some((key) => data[key].toLowerCase().includes(query))
    );

  const ModalContent = (
    <div className="flex flex-row items-center justify-center min-h-screen px-4 py-4 mx-auto md:px-0">
      <div className="w-full text-lg text-gray-700 border bg-white rounded-lg shadow-lg md:w-[500px]">
        <header className="w-full p-4">
          <div className="flex flex-row items-end justify-end">
            <button onClick={handleClose}>
              <img src={close} alt="closeIcon" />
            </button>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center px-4 space-y-4">
          {hasError && (
            <p className="font-bold text-red-500">
              {error} error occured. Try Again.
            </p>
          )}
          <img src={cautionIcon} alt="caution" />
          <p className="p-1 px-4 text-xl font-extrabold text-center text-black md:text-2xl">
            Confirm Action
          </p>
          <p className="text-center">
            You are attempting to cast your vote for{" "}
            <span className="font-bold">{castedVote}.</span> Kindly confirm your
            action.
          </p>
        </div>

        <section>
          <div className="flex flex-row items-end justify-end w-full p-2 space-x-4 md:p-6">
            <form onSubmit={sendToAPI} className="space-x-4">
              <button
                onClick={handleClose}
                type="button"
                className="p-2 px-6 ml-6 text-black bg-transparent border border-black rounded-md hover:border-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 px-6 text-white bg-green-500 rounded-md hover:bg-green-600 hover:-translate-y-1"
              >
                {`Confirm`}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
  return (
    <>
      <Nav bg="FFEDF1" />
      <Modal open={open} children={ModalContent} />
      <div className="flex flex-row items-center justify-center  bg-[#EDFFF0]">
        <div className="flex flex-col items-center justify-center p-16 space-y-4">
          <p className="text-3xl font-bold text-center">
            Select the party you'd like to vote
          </p>
          <input
            className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 bg-transparent border-b fontAwesome"
            type="text"
            placeholder="&#xF002; Search Party or Candidate Name"
            onChange={(e) => {
              return setQuery(e.target.value.toLowerCase());
            }}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center py-4 mx-auto md:px-4">
        <div className="w-full text-lg text-gray-700 md:w-3/4 ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 md:p-8">
              <div className="px-4 space-y-4">
                {search(Parties).map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="p-4 border border-gray-200 rounded-md md:p-6"
                    >
                      <label htmlFor={item.id}>
                        <div className="flex flex-row items-center justify-between pb-2 border-b border-gray-200">
                          <div className="flex flex-row space-x-2 font-semibold">
                            <img
                              src={item.partyLogo}
                              className="w-5 h-5 rounded md:h-8 md:w-8"
                              alt=""
                            />
                            <p className="text-sm md:text-lg">
                              {item.partyName}
                            </p>
                          </div>
                          <input
                            id={item.id}
                            name="party"
                            type="radio"
                            value={item.partyName}
                            onChange={checkHandler}
                            className="w-5 h-5 text-gray-600 border-gray-300 focus:ring-gray-500"
                          />
                        </div>
                        <div className="flex flex-row items-center justify-between ">
                          <section className="flex flex-col items-start justify-start w-full p-4 space-y-2">
                            <div className="flex flex-row items-start justify-start space-x-4">
                              <img
                                src={candidate}
                                className="w-8 h-8 rounded"
                                alt=""
                              />
                              <p className="text-sm md:text-lg">
                                {item.candidate}
                              </p>
                              <Badge>{item.cBadge}</Badge>
                            </div>
                            <div className="flex flex-row items-start justify-start space-x-4">
                              <img
                                src={vice}
                                className="w-8 h-8 rounded"
                                alt=""
                              />
                              <p className="text-sm md:text-lg">
                                {item.runningMate}
                              </p>
                              <Badge>
                                <p className="text-xs md:text-lg">
                                  {item.vBadge}
                                </p>
                              </Badge>
                            </div>
                          </section>
                          <button
                            type="submit"
                            disabled={
                              castedVote !== item.partyName ? true : false
                            }
                            className={`${
                              castedVote === item.partyName
                                ? "bg-green-500 cursor-pointer"
                                : "bg-gray-500 cursor-not-allowed disabled"
                            } px-4 md:px-8 text-white rounded p-2 text-sm md:text-lg`}
                          >
                            Vote
                          </button>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormFive;
