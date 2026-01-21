import { useState } from "react";
import { STARTUP_IDEAS } from "../../../public/data/journeyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

export default function StartupExplorer() {
  const [selectedKey, setSelectedKey] = useState("homeServices");
  const idea = STARTUP_IDEAS[selectedKey];
  const [open,setOpen]=useState(false);

 return (
  <div className="min-h-screen bg-gray-100 px-4 py-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* Sidebar */}
      <aside
        className="
          bg-white rounded-xl shadow
          p-4
          md:col-span-1
          md:sticky md:top-6
          h-fit
        "
      >
        <h2 className="font-bold text-base sm:text-lg mb-3">
          Startup Ideas
        </h2>

        <div className="relative">
  <button
    className="
      w-full p-3 rounded-lg border border-gray-300
      bg-white text-left
      focus:ring-2 focus:ring-blue-500
      flex justify-between items-center
    "
    onClick={() => setOpen(!open)}
  >
    <span className="truncate">{STARTUP_IDEAS[selectedKey]?.title}</span>
    <span>▾</span>
  </button>

  {open && (
    <div
      className="
        absolute z-50 mt-1 w-full
        max-h-60 overflow-y-auto
        bg-white border rounded-lg shadow
      "
    >
      {Object.entries(STARTUP_IDEAS).map(([key, value]) => (
        <button
          key={key}
          onClick={() => {
            setSelectedKey(key);
            setOpen(false);
          }}
          className="
            w-full text-left px-4 py-2
            hover:bg-gray-100
            truncate
          "
        >
          {value.title}
        </button>
      ))}
    </div>
  )}
</div>

      </aside>

      {/* Main Content */}
      <main
        className="
          md:col-span-3
          bg-white rounded-xl shadow
          p-4 sm:p-6
          space-y-6
        "
      >
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {idea.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {idea.tagline}
          </p>
        </div>

        {/* Problem */}
        {idea.problem && (
          <section>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="mr-2 text-yellow-500"
              />
              Problem
            </h3>

            {Array.isArray(idea.problem) ? (
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                {idea.problem.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : (
              <div className="space-y-3 text-sm sm:text-base">
                <div>
                  <h4 className="font-medium">Customers</h4>
                  <ul className="list-disc pl-5">
                    {idea.problem.customers?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Service Providers</h4>
                  <ul className="list-disc pl-5">
                    {idea.problem.providers?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Solution */}
        {idea.solution && (
          <section>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">
              Solution
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {idea.solution.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Revenue */}
        {idea.revenueModel && (
          <section>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 flex items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="mr-2 text-green-600"
              />
              Revenue Model
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {idea.revenueModel.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Roadmap */}
        {idea.roadmap && (
          <section>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">
              Roadmap
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base">
              {idea.roadmap.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </section>
        )}
      </main>
    </div>
  </div>
);


}
