import { Eye, Download } from "lucide-react";
import Image from "next/image";

interface Report {
  id: string;
  title: string;
  doctorName: string;
  date: string;
}

interface RecentReportsProps {
  reports?: Report[];
}

export function AllReport({ reports }: RecentReportsProps) {
  const defaultReports: Report[] = [
    {
      id: "1",
      title: "Blood Test Results",
      doctorName: "Dr. Michael Chen",
      date: "March 10, 2024",
    },
    {
      id: "2",
      title: "X-Ray Report",
      doctorName: "Dr. James Wilson",
      date: "February 28, 2024",
    },
    {
      id: "3",
      title: "MRI Brain Scan",
      doctorName: "Dr. Sarah Johnson",
      date: "January 18, 2024",
    },
  ];

  const displayReports = reports || defaultReports;

  return (
    <div className="bg-white rounded-[22px] mt-4 shadow-sm p-4 sm:p-6 w-full max-w-[1100px]  mb-20">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
       <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Recent Reports
      </h2>

        <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reports..."
            className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
          <button className="flex items-center justify-center rounded-full hover:opacity-90 transition-all">
            <Image
              src="/images/mynaui_search.png"
              alt="Search"
              width={22}
              height={22}
            />
          </button>
        </div>
      </div>

      {/* Report List */}
      <div className="space-y-3">
        {displayReports.map((report) => (
          <div
            key={report.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-[18px] border border-gray-200 bg-white p-4 gap-3 transition-all hover:shadow-sm"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.1875 12.9375H12.9375V14.375H7.1875V12.9375ZM7.1875 9.34375H15.8125V10.7812H7.1875V9.34375ZM7.1875 16.5312H10.7812V17.9688H7.1875V16.5312Z"
                    fill="#01503F"
                  />
                  <path
                    d="M17.9688 3.59375H15.8125V2.875C15.8125 2.49375 15.661 2.12812 15.3915 1.85853C15.1219 1.58895 14.7562 1.4375 14.375 1.4375H8.625C8.24375 1.4375 7.87812 1.58895 7.60853 1.85853C7.33895 2.12812 7.1875 2.49375 7.1875 2.875V3.59375H5.03125C4.65 3.59375 4.28437 3.7452 4.01478 4.01478C3.7452 4.28437 3.59375 4.65 3.59375 5.03125V20.125C3.59375 20.5062 3.7452 20.8719 4.01478 21.1415C4.28437 21.411 4.65 21.5625 5.03125 21.5625H17.9688C18.35 21.5625 18.7156 21.411 18.9852 21.1415C19.2548 20.8719 19.4062 20.5062 19.4062 20.125V5.03125C19.4062 4.65 19.2548 4.28437 18.9852 4.01478C18.7156 3.7452 18.35 3.59375 17.9688 3.59375ZM8.625 2.875H14.375V5.75H8.625V2.875ZM17.9688 20.125H5.03125V5.03125H7.1875V7.1875H15.8125V5.03125H17.9688V20.125Z"
                    fill="#01503F"
                  />
                </svg>
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 text-[15px] sm:text-[16px]">
                  {report.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {report.doctorName} • {report.date}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 justify-end sm:justify-normal">
              <button className="text-gray-500 hover:text-gray-800 transition-colors">
                <Eye className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-800 transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
