import React, { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

// Accept servicesTreatementOffered and education as props
export default function DoctorProfileTabs({
  servicesTreatementOffered = [],
  education = [],
  primarySpecialization = [],
  experienceDetails = [],
  memberships = [],
  faqs = [],
  yearsOfExperience,
  city,
  country,
  Description,
  doctorName,
}: {
  servicesTreatementOffered?: string[];
  education?: { institute: string; degreeName: string; fieldOfStudy?: string }[];
  primarySpecialization?: string[];
  experienceDetails?: string[];
  memberships?: string[];
  faqs?: { question: string; answer: string; table?: { location: string; fee: string }[] }[];
  yearsOfExperience?: string | number;
  city?: string;
  country?: string;
  Description?: string;
  doctorName?: string;
}) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scroll active tab into view when tab changes or on mobile
  useEffect(() => {
    if (tabsRef.current && isMobile) {
      const activeTabElement = tabsRef.current.children[activeTab] as HTMLElement;
      if (activeTabElement) {
        const scrollLeft = activeTabElement.offsetLeft - tabsRef.current.offsetWidth / 2 + activeTabElement.offsetWidth / 2;
        tabsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeTab, isMobile]);
  
  const tabList = ["Feedback", "Services", "Education", "Other Info", "FAQs"];

  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      flexDirection: "column", 
      marginTop: isMobile ? 16 : 32 
    }}>
      <div 
        ref={tabsRef}
        style={{ 
          display: "flex", 
          gap: isMobile ? 24 : 64, 
          marginLeft: 0, 
          padding: 0,
          overflowX: isMobile ? "auto" : "visible",
          msOverflowStyle: "none",  /* IE and Edge */
          scrollbarWidth: "none",   /* Firefox */
          WebkitOverflowScrolling: "touch",
          paddingBottom: isMobile ? 8 : 0,
          maxWidth: "100%"
        }}
      >
        {tabList.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              fontSize: isMobile ? 16 : 18,
              fontWeight: 500,
              color: "#414141",
              position: "relative",
              paddingBottom: 8,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                borderBottom: activeTab === idx ? "3px solid #003F31" : "none",
                width: "100%",
                display: "inline-block",
                paddingBottom: activeTab === idx ? 4 : 0,
                transition: "border-bottom 0.2s",
              }}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
      {/* Feedback content shown only when Feedback tab is selected */}
      {activeTab === 0 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          <div style={{ 
            fontSize: isMobile ? 18 : 22, 
            fontWeight: 600, 
            color: "#414141", 
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Dr. Shazia Humayun Malik's Reviews (75)
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row", 
            alignItems: isMobile ? "center" : "flex-start", 
            justifyContent: "space-between",
            gap: isMobile ? 24 : 0 
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              minWidth: isMobile ? "auto" : 180,
              justifyContent: isMobile ? "center" : "flex-start",
              width: isMobile ? "100%" : "auto"
            }}>
              <div style={{
                height: isMobile ? 56 : 64,
                width: isMobile ? 56 : 64,
                borderRadius: "50%",
                background: "#01503F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "normal",
                fontSize: isMobile ? 14 : 16,
                marginRight: 16,
              }}>
                100%
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, color: "#52525B" }}>Satisfied out of 75</div>
                <div style={{ fontSize: 14, color: "#52525B" }}>Patients</div>
              </div>
            </div>
            <div style={{ 
              maxWidth: isMobile ? "100%" : 350, 
              marginLeft: isMobile ? 0 : "auto",
              width: isMobile ? "100%" : "auto"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Doctor Checkup</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Clinic Environment</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Staff Behaviour</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ 
            marginTop: isMobile ? 24 : 32, 
            maxWidth: isMobile ? "100%" : 400,
            width: "100%" 
          }}>
            <div style={{ 
              borderRadius: 12, 
              border: "1px solid #CDCDCD", 
              padding: 16, 
              background: "#fff" 
            }}>
              <div style={{ fontSize: 14, color: "#414141" }}>
                One of the best surgeons! 100% recommended
              </div>
              <div style={{ fontSize: 14, color: "#676767", marginTop: 4 }}>
                Verified patient: S**a · 5 months ago
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Services tab content */}
      {activeTab === 1 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Services
          </div>
          {servicesTreatementOffered && servicesTreatementOffered.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 8 : 32,
              maxWidth: 600,
            }}>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {servicesTreatementOffered
                  .filter((_, idx) => idx % 2 === 0)
                  .map((service, idx) => (
                    <li key={service + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {service}
                    </li>
                  ))}
              </ul>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {servicesTreatementOffered
                  .filter((_, idx) => idx % 2 === 1)
                  .map((service, idx) => (
                    <li key={service + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {service}
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No services available.</div>
          )}
        </div>
      )}
      {/* Education tab content */}
      {activeTab === 2 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Education
          </div>
          {education && education.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 8 : 32,
              maxWidth: 900,
            }}>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {education
                  .filter((_, idx) => idx % 2 === 0)
                  .map((e, idx) => (
                    <li key={e.degreeName + e.institute + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {e.degreeName}
                      {e.fieldOfStudy ? ` (${e.fieldOfStudy})` : ""}
                      {e.institute ? ` — ${e.institute}` : ""}
                    </li>
                  ))}
              </ul>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {education
                  .filter((_, idx) => idx % 2 === 1)
                  .map((e, idx) => (
                    <li key={e.degreeName + e.institute + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {e.degreeName}
                      {e.fieldOfStudy ? ` (${e.fieldOfStudy})` : ""}
                      {e.institute ? ` — ${e.institute}` : ""}
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No education details available.</div>
          )}
        </div>
      )}
      {/* Other Info tab content */}
      {activeTab === 3 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Specialization
          </div>
          {primarySpecialization && primarySpecialization.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 8 : 32,
              maxWidth: 900,
            }}>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {primarySpecialization
                  .filter((_, idx) => idx % 2 === 0)
                  .map((spec, idx) => (
                    <li key={spec + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {spec}
                    </li>
                  ))}
              </ul>
              <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
                {primarySpecialization
                  .filter((_, idx) => idx % 2 === 1)
                  .map((spec, idx) => (
                    <li key={spec + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                      {spec}
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No specialization info available.</div>
          )}

          <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginTop: isMobile ? 24 : 32,
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Experience
          </div>
          {/* Professional sentence for experience */}
          {yearsOfExperience ? (
            <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
              <li style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                {(() => {
                  const years = Number(yearsOfExperience);
                  const endYear = 2025; // You can use new Date().getFullYear() if you want dynamic
                  const startYear = endYear - years + 1;
                  return `${startYear} - ${endYear}: ${years} years of clinical experience as a specialist${city ? ` in ${city}` : ""}${country ? `, ${country}` : ""}.`;
                })()}
              </li>
            </ul>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No experience details available.</div>
          )}

          {/* <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginTop: isMobile ? 24 : 32,
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Professional memberships
          </div>
          {memberships && memberships.length > 0 ? (
            <ul style={{ listStyle: "disc inside", margin: 0, padding: 0 }}>
              {memberships.map((mem, idx) => (
                <li key={mem + idx} style={{ fontSize: 16, color: "#222", marginBottom: 8 }}>
                  {mem}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No memberships listed.</div>
          )} */}

          {/* About Doctor section */}
          <div style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 600,
            color: "#414141",
            marginTop: isMobile ? 24 : 32,
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            {`About Dr. ${doctorName || ""}`}
          </div>
          <div style={{ fontSize: 16, color: "#222", marginBottom: 12 }}>
            {Description ||
              `Dr. ${doctorName || ""} is a top specialist with ${yearsOfExperience || "N/A"} years of experience. You can book an in-person appointment or an online video consultation.`}
          </div>
          {/* Experience summary sentence */}
          {yearsOfExperience && (
            <div style={{ fontSize: 16, color: "#222", marginBottom: 12 }}>
              {(() => {
                const years = Number(yearsOfExperience);
                const endYear = 2025;
                const startYear = endYear - years + 1;
                return `Dr. ${doctorName || ""} has over ${years} years of experience in ${city ? city + ", " : ""}${country || ""}. (${startYear} - ${endYear})`;
              })()}
            </div>
          )}
        </div>
      )}
      {/* FAQs tab content */}
      {activeTab === 4 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          {faqs && faqs.length > 0 ? (
            <div>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ marginBottom: isMobile ? 32 : 40 }}>
                  <div style={{
                    fontSize: isMobile ? 20 : 24,
                    fontWeight: 600,
                    color: "#414141",
                    marginBottom: isMobile ? 8 : 12,
                  }}>
                    {faq.question}
                  </div>
                  <div style={{
                    fontSize: 16,
                    color: "#414141",
                    marginBottom: faq.table ? 8 : 16,
                  }}>
                    {faq.answer}
                  </div>
                  {faq.table && faq.table.length > 0 && (
                    <table style={{ width: "100%", marginBottom: 16 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", fontWeight: 500, fontSize: 16, color: "#222", paddingBottom: 8 }}>Location</th>
                          <th style={{ textAlign: "left", fontWeight: 500, fontSize: 16, color: "#222", paddingBottom: 8 }}>Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faq.table.map((row, i) => (
                          <tr key={row.location + i}>
                            <td style={{ fontSize: 16, color: "#222", paddingBottom: 4 }}>{row.location}</td>
                            <td style={{ fontSize: 16, color: "#222", paddingBottom: 4 }}>{row.fee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 16, color: "#676767" }}>No FAQs available.</div>
          )}
        </div>
      )}
      {/* ...existing code for other tabs... */}
    </div>
  );
}

// Add this CSS for hiding scrollbar but keeping scroll functionality
const scrollbarStyles = `
  div[style*="overflow-x: auto"]::-webkit-scrollbar {
    display: none;
  }
`;

// Add the style to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = scrollbarStyles;
  document.head.appendChild(style);
}
