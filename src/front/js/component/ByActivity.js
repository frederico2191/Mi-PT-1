import React from "react";
import { TfiTrash } from "react-icons/tfi";

const ByActivity = () => {
  return (
    <div>
      <p>
        <a
          className="btn btn-primary"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Zumba
        </a>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <div className="grid text-center">
            <div className="g-col-6 border border-success-subtle">
              Miguel 22 AUG 2023 <TfiTrash />
            </div>
            <div className="g-col-6">
              Peter 22 AUG 2023 <TfiTrash />
            </div>
            <div className="g-col-6">
              .g-col-6 <TfiTrash />
            </div>
            <div className="g-col-6">
              .g-col-6 <TfiTrash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByActivity;
