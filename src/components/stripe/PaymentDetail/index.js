import React, { useEffect, useState } from "react";
import PaymentForm from "../PaymentForm";
import { useRouter } from "next/router";
import { ParentNavbar, Footer } from "../../";
import GetUserCardDetail from "@/services/stripe/GetUserCardDetail";
export default function index() {
  const navigation = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [cardDetail, setCardDetail] = useState({
    name: "",
    cardNumber: "",
    brand: "",
    expiry: "",
  });
  const handleOnClick = () => {
    if (isEdit) {
    } else {
      setIsEdit(true);
    }
  };
  const fetchUserCardDetail = async () => {
    try {
      let res = await GetUserCardDetail();
      const data = res?.data;
      setCardDetail({
        name: data?.name || "",
        cardNumber: "***********" + data?.last4Digits,
        brand: data?.brand,
        expiry: data?.expMonth + "/" + data?.expYear,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchUserCardDetail();
  }, []);
  return (
    <main className=" d-flex flex-column justify-content-between  min-vh-100">
      <ParentNavbar />
      <div className="m-auto" style={{ maxWidth: "600px", width: "100%" }}>
        <div>
          {isEdit && (
            <PaymentForm
              disabled={isEdit ? false : true}
              title="Credit card information"
            />
          )}
          {!isEdit && (
            <>
              <h4 className="text-dark fw-bold pb-2">
                Credit card information
              </h4>
              {Object.keys(cardDetail).map((item, index) => {
                return (
                  <div key={index} style={{ height: "90%" }}>
                    <div>
                      <input
                        disabled={true}
                        placeholder={item}
                        className="w-100 p-2 rounded outline-0 border border_gray  my-2"
                        value={cardDetail[item]}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div className="d-flex gap-2 justify-content-center mt-3">
            {isEdit && (
              <button
                className="w-25 btn_primary text-light p-2 rounded fw-bold "
                onClick={() => setIsEdit(false)}
              >
                Back
              </button>
            )}
            <button
              className="w-25 btn_primary text-light p-2 rounded fw-bold "
              onClick={handleOnClick}
            >
              {isEdit ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
