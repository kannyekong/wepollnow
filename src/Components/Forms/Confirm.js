import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Nav from "../Layout/Landing/mainNav";

const Confirm = (props) => {
  const [hasError, sethasError] = useState(false);
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  const {
    phone,
    email,
    firstTimeVoter,
    LGAofR,
    SoR,
    pvc,
    employmentStatus,
    Gender,
  } = props.data;

  const data = [
    phone,
    email,
    firstTimeVoter,
    LGAofR,
    SoR,
    pvc,
    employmentStatus,
    Gender,
  ];

  useEffect(() => {
    data.forEach((item) => {
      if (item === "") {
        sethasError(true);
      }
    });
  });

  return (
    <>
      <Nav />
      <div className="flex flex-row items-center justify-center px-4 py-4 mx-auto md:px-0">
        <div className="w-full text-lg text-gray-700 border rounded-lg shadow-lg md:w-1/2">
          <header className="w-full p-8 border-b">
            <div className="flex flex-col items-center justify-center space-y-1">
              <h3 className="text-2xl font-bold text-center md:text-3xl">
                Review & Confirm Your Details
              </h3>
              <p className="px-4 text-sm font-semibold text-center text-black bg-green-200 rounded-full md:text-lg">
                You can go back to modify details before submitting
              </p>
            </div>
          </header>

          {/*  */}
          <section>
            <Formik initialValues={props.data} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form>
                  <div className="flex flex-col p-8 space-y-4">
                    <div className="h-64 px-4 space-y-4 overflow-y-scroll scrollable">
                      <div
                        className={
                          hasError
                            ? "bg-red-400 text-white rounded-md p-4"
                            : "hidden"
                        }
                      >
                        <b>Error:</b> All details are required. Kindly go back
                        and fill in all.
                      </div>

                      <div
                        className={
                          hasError
                            ? "border border-red-400 p-4 rounded-lg"
                            : "border border-gray-200 p-4 rounded-lg"
                        }
                      >
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold">PHONE NUMBER :</span>{" "}
                          <p className="px-2 bg-green-200 rounded-lg ">
                            {props.data.phone}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">Email : </span>
                          {""}
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.email}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">
                            FIRST TIME VOTER ? :
                          </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.firstTimeVoter}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">
                            LGA of origin:{" "}
                          </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.LGAofR}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">
                            State of origin:{" "}
                          </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.SoR}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">
                            Do you have a PVC ? :{" "}
                          </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.pvc}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3 border-b border-gray-200">
                          <span className="font-bold uppercase">GENDER: </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.Gender}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between px-4 py-3">
                          <span className="font-bold uppercase">
                            Employment Status:{" "}
                          </span>
                          <p className="px-2 bg-green-200 rounded-lg">
                            {props.data.employmentStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full p-2 space-x-4 border-t md:p-6">
                    <button
                      type="button"
                      onClick={() => props.prev(values)}
                      className="p-2 px-4 ml-6 text-white bg-red-500 rounded-md"
                    >
                      Go Back
                    </button>
                    <button
                      type="submit"
                      className={
                        hasError
                          ? "hidden"
                          : "p-2 px-4 bg-green-800 text-white rounded-md"
                      }
                    >
                      {`Confirm & Submit`}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      </div>
    </>
  );
};

export default Confirm;
